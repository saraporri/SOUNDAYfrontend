import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArtistComponent } from './artist.component';
import { EventEditModalComponent } from './edit-event-modal/edit-event-modal.component';
import { ArtistRoutingModule } from './artist-routing.module';
import { AddEventModalComponent } from './add-event-modal/add-event-modal.component';

@NgModule({
  declarations: [
    ArtistComponent,
    EventEditModalComponent,
    AddEventModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ArtistRoutingModule
  ]
})
export class ArtistModule { }
