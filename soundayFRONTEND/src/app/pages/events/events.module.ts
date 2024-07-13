import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { EventService } from './events.service';

@NgModule({
  declarations: [EventsComponent],
  imports: [
    CommonModule,
  ],
  providers: [EventService],
  exports: [EventsComponent]
})
export class EventsModule { }
