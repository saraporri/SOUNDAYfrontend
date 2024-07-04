import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IEvent } from '../../../models/i-event';
@Component({
  selector: 'app-event-edit-modal',
  templateUrl: './edit-event-modal.component.html',
  styleUrls: ['./edit-event-modal.component.scss']
})
export class EventEditModalComponent {
  @Input() event!: IEvent;
  @Output() eventUpdated = new EventEmitter<IEvent>();

  constructor(public activeModal: NgbActiveModal) {}

  save() {
    this.eventUpdated.emit(this.event);
    this.activeModal.close();
  }
}
