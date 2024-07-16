import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IEvent } from '../../../models/i-event';
import { EditEventModalComponent } from "../edit-event-modal/edit-event-modal.component";
import { AddEventModalComponent } from '../add-event-modal/add-event-modal.component';
import { IUser } from '../../../models/i-user';
import { EventService } from '../../events/events.service';
import { AuthService } from '../../../auth/auth.service';
import { CountsAndLike } from '../../../models/counts-and-like';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  events: IEvent[] = [];
  pastEvents: IEvent[] = [];
  user: IUser | null = null;
  eventCounts: { [key: number]: CountsAndLike } = {};

  constructor(private eventService: EventService, private authService: AuthService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.loadEvents();
    });
  }

  loadEvents() {
    combineLatest([
      this.eventService.getAll(),
      this.authService.user$
    ]).subscribe(([allEvents, user]) => {
      if (user) {
        console.log('User:', user);
        console.log('All Events:', allEvents);

        const artistEvents = allEvents.filter(event => {
          console.log(`Event ${event.id} artistId:`, event.artist?.id);
          return event.artist && event.artist.id === user.id;
        });

        console.log('Artist Events:', artistEvents);

        const today = new Date();
        this.events = artistEvents.filter(event => new Date(event.eventDate) >= today);
        this.pastEvents = artistEvents.filter(event => new Date(event.eventDate) < today);

        const likedEventIds: number[] = user.likeEvents || [];
        artistEvents.forEach(event => {
          if (event.id) {
            this.eventCounts[event.id] = {
              id: event.id,
              likedByCurrentUser: likedEventIds.includes(event.id),
              participantsCount: event.participantsCount || 0,
              likesCount: event.likesCount || 0
            };
          }
        });
      }
    });
  }

  toggleLike(event: CountsAndLike): void {
    if (this.user) {
      this.eventService.toggleLike(event.id, this.user.id).subscribe(() => {
        event.likedByCurrentUser = !event.likedByCurrentUser;
        event.likedByCurrentUser ? event.likesCount++ : event.likesCount--;
      });
    } else {
      console.log('User not logged in');
    }
  }

  getEventCounts(eventId: number): CountsAndLike | undefined {
    return this.eventCounts[eventId];
  }

  openAddEventModal(): void {
    const modalRef = this.modalService.open(AddEventModalComponent);
    modalRef.componentInstance.user = this.user;

    modalRef.result.then((result) => {
      if (result) {
        this.loadEvents();
      }
    }).catch((error) => {
      console.log('Modal dismissed:', error);
    });
  }

  editEvent(event: IEvent) {
    const modalRef = this.modalService.open(EditEventModalComponent);
    modalRef.componentInstance.event = { ...event };

    modalRef.componentInstance.eventUpdated.subscribe((updatedEvent: IEvent) => {
      const index = this.events.findIndex(e => e.id === updatedEvent.id);
      if (index !== -1) {
        this.events[index] = updatedEvent;
        this.loadEvents();
      }
    });
  }

  deleteEvent(event: IEvent): void {
    if (confirm(`Are you sure you want to delete the event "${event.title}"?`)) {
      this.eventService.deleteEvent(event.id).subscribe({
        next: (response) => {
          console.log('Event deleted successfully:', response);
          this.events = this.events.filter(e => e.id !== event.id);
          this.pastEvents = this.pastEvents.filter(e => e.id !== event.id);
        },
        error: (error) => {
          console.error('Error deleting event:', error);
        }
      });
    }
  }
}
