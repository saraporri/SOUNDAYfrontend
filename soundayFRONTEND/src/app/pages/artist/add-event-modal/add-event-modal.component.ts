import { Component, EventEmitter, Output } from '@angular/core';
import { IEvent } from '../../../models/i-event';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrl: './add-event-modal.component.scss'
})
export class AddEventModalComponent {
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

  @Output() eventAdded = new EventEmitter<IEvent>();

  constructor(public activeModal: NgbActiveModal) {}

  save() {
    this.eventAdded.emit(this.event);
    this.activeModal.close();
  }
}
