import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../models/i-user';
import { AuthService } from '../../../auth/auth.service';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-artists',
  templateUrl: './show-artists.component.html',
  styleUrls: ['./show-artists.component.scss']
})
export class ShowArtistsComponent implements OnInit {
  artists: IUser[] = [];
  user: IUser | null = null;

  constructor(private userService: UserService, private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.loadArtists();
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  loadArtists(): void {
    this.userService.getArtists().subscribe({
      next: (artists) => {
        this.artists = artists.sort((a, b) => {
          const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
          const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
      },
      error: (error) => {
        console.error('Error loading artists:', error);
      }
    });
  }

  showArtistPage(artist: IUser): void {
    this.router.navigate(['/artist', artist.id, artist.username]);
  }
}
