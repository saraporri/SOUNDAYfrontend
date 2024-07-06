import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrl: './edit-profile-modal.component.scss'
})
export class EditProfileModalComponent {
  @Input() user: any;

  constructor(public activeModal: NgbActiveModal) {}

  save() {
    // Salva i dati e chiudi la modale
    this.activeModal.close(this.user);
  }
}
