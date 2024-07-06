import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IEvent } from '../../../models/i-event';
import { EditEventModalComponent } from "../edit-event-modal/edit-event-modal.component";
import { AddEventModalComponent } from '../add-event-modal/add-event-modal.component';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent {
  @Input() event!: IEvent; // Usa il tipo opzionale

openAddEventModal() {
  const modalRef = this.modalService.open(AddEventModalComponent);

  modalRef.componentInstance.eventAdded.subscribe((newEvent: IEvent) => {
    // Aggiungi la logica per gestire il nuovo evento aggiunto
    console.log('New Event added:', newEvent);
    // Esegui altre azioni come salvataggio nel backend, aggiornamento UI, etc.
  });
}

  constructor(private modalService: NgbModal) {}

  editEvent() {
    const modalRef = this.modalService.open(EditEventModalComponent);
    modalRef.componentInstance.event = { ...this.event }; // Passa una copia dell'evento da modificare

    modalRef.componentInstance.eventUpdated.subscribe((updatedEvent: IEvent) => {
      this.event = updatedEvent;
      // Aggiungi la logica per aggiornare l'evento nel backend se necessario
      console.log('Event updated:', updatedEvent);
    });
  }
}
