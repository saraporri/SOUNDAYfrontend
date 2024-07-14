import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IEvent } from '../../../models/i-event';
import { EventService } from '../../events/events.service';
import { IUser } from '../../../models/i-user';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrls: ['./add-event-modal.component.scss']
})
export class AddEventModalComponent implements OnInit {
  @Input() event:Partial<IEvent> = {

  };
  user: IUser | null = null;

  formattedEventDate: string = '';
  formattedEventTime: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private eventService: EventService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      console.log('User in AddEventModalComponent:', this.user);
    });
    this.setFormattedDateAndTime();
  }

  setFormattedDateAndTime(): void {
    if (this.event.eventDate) {
      const eventDate = new Date(this.event.eventDate);
      this.formattedEventDate = eventDate.toISOString().split('T')[0];
    }

    if (this.event.dateTime) {
      const eventTime = new Date(this.event.dateTime);
      this.formattedEventTime = eventTime.toTimeString().split(' ')[0];
    }
  }

  save() {



    const formData = new FormData();
    formData.append('title', this.event.title as string);
    formData.append('eventDate', this.event.eventDate as any);
    formData.append('dateTime', this.event.dateTime as any);
    formData.append('location', this.event.location  as string);
    formData.append('city', this.event.city  as string);
    formData.append('artistId', this.event.artist as any);

    // Logging formData without using formData.entries
    this.logFormData(formData);

    this.eventService.addEvent(formData).subscribe({
      next: response => {
        console.log('Event added successfully', response);
        this.activeModal.close(response);
      },
      error: error => {
        console.error('Error adding event', error);
      }
    });
  }

  private logFormData(formData: FormData): void {
    const formDataObj: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });
    console.log('FormData being sent:', formDataObj);
  }
}
