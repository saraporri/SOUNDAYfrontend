import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
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

  constructor(private eventService: EventService, private authService: AuthService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadEvents();
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  loadEvents() {
    this.eventService.getAll().subscribe(events => {
      const today = new Date();
      this.events = events;
      this.pastEvents = events.filter(event => new Date(event.eventDate) < today);
    });
  }

  toggleLike(event: IEvent): void {
    this.eventService.toggleLike(event.id, !event.likedByCurrentUser).subscribe(() => {
      event.likedByCurrentUser = !event.likedByCurrentUser;
      event.likedByCurrentUser ? event.likesCount++ : event.likesCount--;
    });
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
