import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArtistComponent } from './artistProfile/artist.component';
import { ArtistRoutingModule } from './artist-routing.module';
import { AddEventModalComponent } from './add-event-modal/add-event-modal.component';
import { EditEventModalComponent } from './edit-event-modal/edit-event-modal.component';
import { ShowArtistsComponent } from './show-artists/show-artists.component';

@NgModule({
  declarations: [
    ArtistComponent,
    AddEventModalComponent,EditEventModalComponent, ShowArtistsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ArtistRoutingModule
  ]
})
export class ArtistModule { }
