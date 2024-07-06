import { Component } from '@angular/core';
import { IEvent } from '../../models/i-event';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileModalComponent } from './edit-profile-modal/edit-profile-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})

export class UserComponent {
  searchQuery: string = '';
  event: IEvent = {
    id:"",
    tourName: 'Example Tour',
    tourPic: 'tour-pic.jpg',
    eventDate: '2024-07-04',
    eventTime: '19:00',
    city: 'Example City',
    region: 'Example Region',
    country: 'Example Country',
    venue: {
      venueName: 'Example Venue',
      venueStreet: 'Example Street',
      venueZip: '12345',
      venueCity: 'Example City',
      venueCountry: 'Example Country'
    },
    likeCount: 0,
    likedByCurrentUser: false,
    attendedCount:0
  };
  user = {
    username: 'johnDoe',
    email: 'john@example.com',
    password: '',
    name: 'John',
    lastName: 'Doe',
    avatar: 'https://example.com/avatar.jpg'
  };


  toggleLike(event: IEvent) {
    event.likedByCurrentUser = !event.likedByCurrentUser;
    if (event.likedByCurrentUser) {
      event.likeCount++;
      // Aggiungi qui la logica per inviare l'aggiornamento del like al backend se necessario
    } else {
      event.likeCount--;
      // Aggiungi qui la logica per rimuovere il like dal backend se necessario
    }
    // Puoi anche emettere un evento o eseguire altre azioni dopo il toggle del like
  }   incrementAttended(eventId: string) {
    if (this.event.id === eventId) {
      this.event.attendedCount++;
      // Aggiungi qui la logica per salvare l'aggiornamento di attendedCount nel backend se necessario
      console.log(`Attended count for event ${eventId} incremented.`);
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
