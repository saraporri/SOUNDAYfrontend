import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { IUser } from '../../models/i-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  userLogged!: IUser | null;
authService: any;

  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {
    this.authSrv.restore();
    this.authSrv.user$.subscribe((_user) => {
      this.userLogged = _user;
    });
  }

  logout() {
    this.authSrv.logout();
  }
}
