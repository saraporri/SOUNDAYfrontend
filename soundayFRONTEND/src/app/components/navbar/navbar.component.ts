import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { IUser } from '../../models/i-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user!: IUser | null;

  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {
      this.user = user;
      console.log('User logged in:', user); // Log for debugging
    });
  }

  logout() {
    this.authSrv.logout();
    this.user = null; // Ensure user is set to null on logout
    console.log('User logged out'); // Log for debugging
  }
}
