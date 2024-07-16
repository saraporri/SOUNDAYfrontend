import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { IEvent } from '../../models/i-event';
import { IUser } from '../../models/i-user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileModalComponent } from './edit-profile-modal/edit-profile-modal.component';
import { EventService } from '../events/events.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  events: IEvent[] = [];
  pastEvents: IEvent[] = [];
  user: IUser | null = null;
  searchQuery: string = '';
  isLoggedIn: boolean = false;

  constructor(private eventService: EventService, private authService: AuthService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.isLoggedIn = !!user;
      this.loadEvents();
    });
  }

  loadEvents(): void {
    if (this.user) {
      const userId = this.user.id;

      // Caricamento degli eventi apprezzati
      this.eventService.getLikedEvents(userId).subscribe(likedEvents => {
        console.log('Liked Events:', likedEvents); // Debugging
        this.events = likedEvents
          .filter(event => new Date(event.eventDate) >= new Date())
          .map(event => ({
            ...event,
            likedByCurrentUser: true,
            participantsCount: event.participantsCount || 0,
            likesCount: event.likesCount || 0
          }))
          .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
      });

      // Caricamento degli eventi partecipati
      this.eventService.getParticipatedEvents(userId).subscribe(participatedEvents => {
        console.log('Participated Events:', participatedEvents); // Debugging
        this.pastEvents = participatedEvents
          .filter(event => new Date(event.eventDate) < new Date())
          .map(event => ({
            ...event,
            likedByCurrentUser: this.user && this.user.likeEvents ? this.user.likeEvents.includes(event.id) : false,
            participantsCount: event.participantsCount || 0,
            likesCount: event.likesCount || 0
          }))
          .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
      });
    }
  }


  toggleLike(event: IEvent): void {
    if (this.user) {
      this.eventService.toggleLike(event.id, this.user.id).subscribe(() => {
        event.likedByCurrentUser = !event.likedByCurrentUser;
        if (event.likedByCurrentUser) {
          event.likesCount++;
          this.events = [...this.events.filter(e => e.id !== event.id), event]; // Assicura che non ci siano duplicati
        } else {
          event.likesCount--;
          this.events = this.events.filter(e => e.id !== event.id);
        }
      });
    } else {
      console.log('User not logged in');
    }
  }

  incrementAttended(eventId: number): void {
    if (this.user) {
      const event = this.events.find(e => e.id === eventId);
      if (event) {
        this.eventService.participateEvent(eventId, this.user.id).subscribe(
          response => {
            console.log('Participation successful:', response);
            if (response.status === 200) {
              event.participantsCount++;
            }
          },
          error => {
            console.error('Error participating in event:', error);
          }
        );
      }
    } else {
      console.log('User not logged in');
    }
  }

  onSearch(): void {
    console.log(this.searchQuery);
  }

  editProfile(): void {
    const modalRef = this.modalService.open(EditProfileModalComponent);
    modalRef.componentInstance.user = { ...this.user };

    modalRef.result.then((result) => {
      if (result) {
        this.user = result;
      }
    }).catch((error) => {
      console.log('Modal dismissed:', error);
    });
  }
}
