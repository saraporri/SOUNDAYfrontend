import { Component, EventEmitter, Output } from '@angular/core';
import { IEvent } from '../../../models/i-event';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrl: './add-event-modal.component.scss'
})
export class AddEventModalComponent {
  newEvent: IEvent = {
    tourName: '',
    tourPic: '',
    eventDate: '',
    eventTime: '',
    city: '',
    region: '',
    country: '',
    venue: {
      venueName: '',
      venueStreet: '',
      venueZip: '',
      venueCity: '',
      venueCountry: ''
    },
    likedByCurrentUser: false,
    likeCount: 0,
    attendedCount: 0,
    id: ''
  };

  @Output() eventAdded = new EventEmitter<IEvent>();

  constructor(public activeModal: NgbActiveModal) {}

  save() {
    this.eventAdded.emit(this.newEvent);
    this.activeModal.close();
  }
}
