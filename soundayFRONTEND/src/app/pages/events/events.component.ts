import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { IEvent } from '../../models/i-event';
import { EventService } from './events.service';
import { IUser } from '../../models/i-user';
import { CountsAndLike } from '../../models/counts-and-like';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditEventModalComponent } from '../artist/edit-event-modal/edit-event-modal.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: (IEvent & CountsAndLike)[] = [];
  isLoggedIn: boolean = false;

  constructor(private eventService: EventService, private authService: AuthService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  editEvent(event: IEvent): void {
    const modalRef = this.modalService.open(EditEventModalComponent);
    modalRef.componentInstance.event = { ...event }; // Passa una copia dell'evento da modificare

    modalRef.componentInstance.eventUpdated.subscribe((updatedEvent: IEvent) => {
      this.loadEvents(); // Ricarica tutti gli eventi dopo l'aggiornamento
    });
  }

  loadEvents() {
    combineLatest([
      this.eventService.getAll(),
      this.authService.user$
    ]).subscribe(([allEvents, user]) => {
      this.events = allEvents.map(event => ({
        ...event,
        likedByCurrentUser: false,
        participantsCount: 0,
        likesCount: 0
      }));
      console.log(this.events);

      this.isLoggedIn = !!user;

      if (user) {
        const likedEventIds: number[] = user.likeEvents || [];
        this.events.forEach(event => {
          event.likedByCurrentUser = likedEventIds.includes(event.id);
        });
      }
    });
  }

  toggleLike(event: CountsAndLike): void {
    this.eventService.toggleLike(event.id, !event.likedByCurrentUser).subscribe(() => {
      event.likedByCurrentUser = !event.likedByCurrentUser;
      event.likedByCurrentUser ? event.likesCount++ : event.likesCount--;
    });
  }



  deleteEvent(event: IEvent): void {
    if (confirm(`Are you sure you want to delete the event "${event.title}"?`)) {
      this.eventService.deleteEvent(event.id).subscribe({
        next: (response) => {
          console.log('Event deleted successfully:', response);
          this.events = this.events.filter(e => e.id !== event.id);  // Rimuovi l'evento dalla lista
        },
        error: (error) => {
          console.error('Error deleting event:', error);
        }
      });
    }
  }

  }
