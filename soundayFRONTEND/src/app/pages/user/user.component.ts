import { Component } from '@angular/core';
import { IEvent } from '../../models/i-event';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileModalComponent } from './edit-profile-modal/edit-profile-modal.component';
import { IUser } from '../../models/i-user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})

export class UserComponent {
  selectedRole: string = '';

  searchQuery: string = '';
  event: IEvent = {
    id: 0,
    title: "",
    dateTime: new Date('2024-07-15T19:00:00'),
    eventDate: new Date('2024-07-15'),
    location: "",
   city:"",

    participantsCount: 0,
    likesCount: 0,
    likedByCurrentUser: false
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
    likeEvents: 0,
    likeArtists: 0,
    events: [],
    partecipation: 0
  };
  user: any;


  toggleLike(event: IEvent) {
    event.likedByCurrentUser = !event.likedByCurrentUser;
    if (event.likedByCurrentUser) {
      event.likesCount++;
      // Aggiungi qui la logica per inviare l'aggiornamento del like al backend se necessario
    } else {
      event.likesCount--;
      // Aggiungi qui la logica per rimuovere il like dal backend se necessario
    }
    // Puoi anche emettere un evento o eseguire altre azioni dopo il toggle del like
  }
  incrementAttended(eventId: number) {
    if (this.event.id === eventId) {
      this.event.participantsCount++;
      // Aggiungi qui la logica per salvare l'aggiornamento di participantsCount nel backend se necessario
      console.log(`Participants count for event ${eventId} incremented.`);
    }
  }

  onSearch() {
    console.log(this.searchQuery); // Qui puoi gestire la logica di ricerca
  }
  constructor(private modalService: NgbModal) {}

  editProfile() {
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
