import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IEvent } from '../../models/i-event';
import { IUser } from '../../models/i-user';
import { UserService } from './user.service';
import { EditProfileModalComponent } from './edit-profile-modal/edit-profile-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  events: IEvent[] = [];
  selectedRole: string = '';
  searchQuery: string = '';
  event: IEvent = {
    id: 0,
    title: '',
    dateTime: new Date('2024-07-15T19:00:00'),
    eventDate: new Date('2024-07-15'),
    location: '',
    city: '',
    participantsCount: 0,
    likesCount: 0,
    likedByCurrentUser: false,
  };
  registerData: IUser = {
    id: 0,
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    roles: '',
    followersCount: 0,
    likeEvents: [],
    likeArtists: 0,
    events: [],
    partecipation: 0
  };
  user: any;

  constructor(private modalService: NgbModal, private userService: UserService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.userService.getEvents().subscribe((events: IEvent[]) => {
      this.events = events;
    });
  }

  toggleLike(event: IEvent): void {
    event.likedByCurrentUser = !event.likedByCurrentUser;
    if (event.likedByCurrentUser) {
      event.likesCount++;
    } else {
      event.likesCount--;
    }
  }

  incrementAttended(eventId: number): void {
    if (this.event.id === eventId) {
      this.event.participantsCount++;
      console.log(`Participants count for event ${eventId} incremented.`);
    }
  }

  onSearch(): void {
    console.log(this.searchQuery); // Qui puoi gestire la logica di ricerca
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
