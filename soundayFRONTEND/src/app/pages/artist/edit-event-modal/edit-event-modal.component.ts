import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IEvent } from '../../../models/i-event';

@Component({
  selector: 'app-edit-event-modal',
  templateUrl: './edit-event-modal.component.html',
  styleUrls: ['./edit-event-modal.component.scss']
})
export class EditEventModalComponent implements OnInit {
  @Input() event!: IEvent;
  @Output() eventUpdated = new EventEmitter<IEvent>();

  eventForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      eventDate: ['', Validators.required],
      dateTime: ['', Validators.required],
      location: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      title: [this.event.title, Validators.required],
      eventDate: [this.event.eventDate, Validators.required],
      dateTime:[this.event.dateTime,Validators.required],
      city: [this.event.city, Validators.required],
      location:[this.event.location,Validators.required],
    });
  }

  save() {
    if (this.eventForm.valid) {
      const updatedEvent = { ...this.event, ...this.eventForm.value };
      this.eventUpdated.emit(updatedEvent);
      this.activeModal.close();
    }
  }
}
