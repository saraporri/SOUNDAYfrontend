import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../models/i-user';
import { AuthService } from '../../../auth/auth.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-show-artists',
  templateUrl: './show-artists.component.html',
  styleUrls: ['./show-artists.component.scss']
})
export class ShowArtistsComponent implements OnInit {
  artists: IUser[] = [];
  user: IUser | null = null;

  constructor(private userService: UserService, private authService: AuthService) { }

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
  likeArtist(artistId: number): void {
    if (this.user) {
      this.userService.likeArtist(this.user.id, artistId).subscribe({
        next: (response) => {
          console.log('Artist liked successfully:', response);
        },
        error: (error) => {
          console.error('Error liking artist:', error);
        }
      });
    } else {
      console.log('User not logged in');
    }
  }
}
