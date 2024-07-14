import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { IUser } from '../../models/i-user';
import { Iroles } from '../../models/iroles';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user!: IUser | null;
  isArtist: boolean = false;

  constructor(private authSrv: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {
      this.user = user;
      this.isArtist = user?.roles.some((role: Iroles) => role.roleType === 'ARTIST') || false;
      console.log('User logged in:', user); // Log for debugging
    });
  }


  logout() {
    this.authSrv.logout();
    this.user = null; // Ensure user is set to null on logout
    this.isArtist = false; // Reset isArtist on logout
    console.log('User logged out'); // Log for debugging
    this.router.navigate(['/']); // Redirect to home page
  }
}
