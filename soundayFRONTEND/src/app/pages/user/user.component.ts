import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { IEvent } from '../../models/i-event';
import { IUser } from '../../models/i-user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileModalComponent } from './edit-profile-modal/edit-profile-modal.component';
import { EventService } from '../events/events.service';
import { CountsAndLike } from '../../models/counts-and-like';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  events: (IEvent & CountsAndLike)[] = [];
  pastEvents: (IEvent & CountsAndLike)[] = [];
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
    this.eventService.getAll().subscribe(events => {
      const today = new Date();
      const userLikeEvents = this.user?.likeEvents || [];  // Use an empty array if user or likeEvents is undefined
      this.events = events.map(event => ({
        ...event,
        likedByCurrentUser: userLikeEvents.includes(event.id),
        participantsCount: event.participantsCount || 0,
        likesCount: event.likesCount || 0
      }));
      this.pastEvents = this.events.filter(event => new Date(event.eventDate) < today);
      this.events = this.events.filter(event => new Date(event.eventDate) >= today);
    });
  }

  toggleLike(event: CountsAndLike): void {
    if (this.user) {
      this.eventService.toggleLike(event.id, !event.likedByCurrentUser).subscribe(() => {
        event.likedByCurrentUser = !event.likedByCurrentUser;
        event.likedByCurrentUser ? event.likesCount++ : event.likesCount--;
      });
    } else {
      console.log('User not logged in');
    }
  }

  incrementAttended(eventId: number): void {
    const event = this.events.find(e => e.id === eventId);
    if (event) {
      event.participantsCount++;
      // Add logic to update the participants count in the backend if necessary
    }
  }

  onSearch(): void {
    console.log(this.searchQuery); // Handle the search logic here
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
