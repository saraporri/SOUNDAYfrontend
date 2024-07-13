import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { IEvent } from '../../models/i-event';
import { EventService } from './events.service';
import { IUser } from '../../models/i-user';
import { CountsAndLike } from '../../models/counts-and-like';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: (IEvent & CountsAndLike)[] = [];
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
      this.events = allEvents.map(event => ({
        ...event,
        likedByCurrentUser: false,
        participantsCount: 0,
        likesCount: 0
      }));
      console.log(this.events);

      this.isLoggedIn = !!user;

      if (user) {
        const likedEventIds: number[] = user.likeEvents || [];
        this.events.forEach(event => {
          event.likedByCurrentUser = likedEventIds.includes(event.id);
        });
      }
    });
  }

  toggleLike(event: CountsAndLike): void {
    this.eventService.toggleLike(event.id, !event.likedByCurrentUser).subscribe(() => {
      event.likedByCurrentUser = !event.likedByCurrentUser;
      event.likedByCurrentUser ? event.likesCount++ : event.likesCount--;
    });
  }
}
