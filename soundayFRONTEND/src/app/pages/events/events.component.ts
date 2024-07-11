import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { IEvent } from '../../models/i-event';
import { EventService } from './events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: IEvent[] = [];
  isLoggedIn: boolean = false;

  constructor(private eventService: EventService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    combineLatest([
      this.eventService.getAll(),
      this.authService.user$
    ]).subscribe(([allEvents, user]) => {
      this.events = allEvents;
      console.log(this.events);

      this.isLoggedIn = !!user;

      if (user) {
        const likedEventIds: number[] = user.likeEvents || []; // Explicitly type as number[]
        this.events.forEach(event => {
          event.likedByCurrentUser = likedEventIds.includes(event.id);
        });
      }
    });
  }

  toggleLike(event: IEvent): void {
    this.eventService.toggleLike(event.id, !event.likedByCurrentUser).subscribe(() => {
      event.likedByCurrentUser = !event.likedByCurrentUser;
      event.likedByCurrentUser ? event.likesCount++ : event.likesCount--;
    });
  }
}
