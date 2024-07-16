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
      this.eventService.getLikedEvents(userId).subscribe(likedEvents => {
        this.events = likedEvents.filter(event => new Date(event.eventDate) >= new Date());
      });

      this.eventService.getParticipatedEvents(userId).subscribe(participatedEvents => {
        this.pastEvents = participatedEvents.filter(event => new Date(event.eventDate) < new Date());
      });
    }
  }

  toggleLike(event: IEvent): void {
    if (this.user) {
      this.eventService.toggleLike(event.id, this.user.id).subscribe(() => {
        event.likedByCurrentUser = !event.likedByCurrentUser;
        if (event.likedByCurrentUser) {
          this.events.push(event);
        } else {
          this.events = this.events.filter(e => e.id !== event.id);
        }
      });
    } else {
      console.log('User not logged in');
    }
  }

  incrementAttended(eventId: number): void {
    const event = this.events.find(e => e.id === eventId);
    if (event) {
      event.participantsCount++;
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
