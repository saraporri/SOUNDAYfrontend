import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IEvent } from '../../../models/i-event';
import { EditEventModalComponent } from "../edit-event-modal/edit-event-modal.component";
import { AddEventModalComponent } from '../add-event-modal/add-event-modal.component';
import { IUser } from '../../../models/i-user';
import { EventService } from '../../events/events.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
updateArtistImage() {
throw new Error('Method not implemented.');
}
  @Input() event!: IEvent; // Usa il tipo opzionale
  events: IEvent[] = [];
  pastEvents: IEvent[] = [];
  currentEvents: IEvent[] = [];
  artist: IUser | null = null;

  constructor(
    private modalService: NgbModal,
    private eventService: EventService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.artist = user;
      this.loadEvents();
    });
  }

  loadEvents(): void {
    if (this.artist) {
      this.eventService.getAll().subscribe(events => {
        const today = new Date();
        this.events = events.filter(event => event.artist?.id === this.artist?.id);
        this.currentEvents = this.events.filter(event => new Date(event.eventDate) >= today);
        this.pastEvents = this.events.filter(event => new Date(event.eventDate) < today);
      });
    }
  }

  openAddEventModal() {
    const modalRef = this.modalService.open(AddEventModalComponent);

    modalRef.componentInstance.eventAdded.subscribe((newEvent: IEvent) => {
      this.events.push(newEvent);
      this.loadEvents(); // Refresh the events to re-categorize them
    });
  }

  editEvent(event: IEvent) {
    const modalRef = this.modalService.open(EditEventModalComponent);
    modalRef.componentInstance.event = { ...event }; // Passa una copia dell'evento da modificare

    modalRef.componentInstance.eventUpdated.subscribe((updatedEvent: IEvent) => {
      const index = this.events.findIndex(e => e.id === updatedEvent.id);
      if (index !== -1) {
        this.events[index] = updatedEvent;
        this.loadEvents(); // Refresh the events to re-categorize them
      }
    });
  }
}
