import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArtistComponent } from './artistProfile/artist.component';
import { ArtistRoutingModule } from './artist-routing.module';
import { AddEventModalComponent } from './add-event-modal/add-event-modal.component';
import { EditEventModalComponent } from './edit-event-modal/edit-event-modal.component';
import { ShowArtistsComponent } from './show-artists/show-artists.component';
import { ShowSingleArtistComponent } from './show-single-artist/show-single-artist.component';

@NgModule({
  declarations: [
    ArtistComponent,
    AddEventModalComponent,EditEventModalComponent,ShowArtistsComponent,ShowSingleArtistComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,ReactiveFormsModule,
    ArtistRoutingModule,
  ]
})
export class ArtistModule { }
