import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { IUser } from '../../models/i-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'] // Correzione del percorso di styleUrls
})
export class NavbarComponent implements OnInit {
  userLogged!: IUser | null;

  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {
    this.authSrv.restore();
    this.authSrv.user$.subscribe({
      next: (user: IUser | null) => {
        this.userLogged = user;
      },
      error: (err: any) => { // Specifica il tipo 'any' per il parametro 'err'
        console.error('Error fetching user:', err);
        this.userLogged = null;
      }
    });
  }

  logout() {
    this.authSrv.logout();
  }
}
