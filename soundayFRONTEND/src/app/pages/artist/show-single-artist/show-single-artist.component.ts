import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from '../../../models/i-event';
import { IUser } from '../../../models/i-user';
import { EventService } from '../../events/events.service';
import { AuthService } from '../../../auth/auth.service';
import { CountsAndLike } from '../../../models/counts-and-like';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-show-single-artist',
  templateUrl: './show-single-artist.component.html',
  styleUrls: ['./show-single-artist.component.scss']
})
export class ShowSingleArtistComponent implements OnInit {
  events: IEvent[] = [];
  pastEvents: IEvent[] = [];
  user: IUser | null = null;
  artistName: string = '';
  eventCounts: { [key: number]: CountsAndLike } = {};
  isLoggedIn: boolean = false;

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.isLoggedIn = !!user;
      console.log('Logged in user:', user);
    });

    this.route.params.subscribe(params => {
      const artistId = +params['id'];
      this.artistName = params['name'];
      console.log('Artist ID:', artistId, 'Artist Name:', this.artistName);
      this.loadEvents(artistId);
    });
  }

  loadEvents(artistId: number): void {
    combineLatest([
      this.eventService.getAll(),
      this.authService.user$
    ]).subscribe(([allEvents, user]) => {
      if (user) {
        console.log('User:', user);
        console.log('All Events:', allEvents);

        const artistEvents = allEvents.filter(event => {
          console.log(`Event ${event.id} artistId:`, event.artist?.id);
          return event.artist && event.artist.id === artistId;
        });

        console.log('Artist Events:', artistEvents);

        const today = new Date();
        this.events = artistEvents.filter(event => new Date(event.eventDate) >= today);
        this.pastEvents = artistEvents.filter(event => new Date(event.eventDate) < today);

        console.log('Upcoming Events:', this.events);
        console.log('Past Events:', this.pastEvents);

        const likedEventIds: number[] = user.likeEvents || [];
        artistEvents.forEach(event => {
          if (event.id) {
            this.eventCounts[event.id] = {
              id: event.id,
              likedByCurrentUser: likedEventIds.includes(event.id),
              participantsCount: event.participantsCount || 0,
              likesCount: event.likesCount || 0
            };
          }
        });
        console.log('Event Counts:', this.eventCounts);
      }
    });
  }

  toggleLike(event: CountsAndLike): void {
    if (this.user && event) {
      console.log('Toggling like for event:', event);
      this.eventService.toggleLike(event.id, this.user.id).subscribe(() => {
        event.likedByCurrentUser = !event.likedByCurrentUser;
        if (event.likedByCurrentUser) {
          event.likesCount++;
        } else {
          event.likesCount--;
        }
        console.log('Updated event:', event);
      });
    } else {
      console.log('User not logged in or event not found');
    }
  }

  getEventCounts(eventId: number): CountsAndLike | undefined {
    const counts = this.eventCounts[eventId];
    console.log('Event counts for eventId', eventId, ':', counts);
    return counts;
  }
}
