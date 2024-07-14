import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ILogin } from '../../models/i-login';
import { Iroles } from '../../models/iroles';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData: ILogin = {
    username: '',
    password: '',
    role: ''
  };

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) {}

  signIn() {
    this.authSvc.login(this.loginData).subscribe({
      next: (response) => {
        const user = response.user;
        this.authSvc.setToken(response.token);
        this.authSvc.setUser(user);

        console.log('User:', user);  // Log user
        console.log('Roles:', user.roles);  // Log roles

        if (user && user.roles) {
          if (user.roles.some((role: Iroles) => role.roleType === 'ARTIST')) {  // Usa l'interfaccia Roles
            this.router.navigate(['/artist']);
          } else if (user.roles.some((role: Iroles) => role.roleType === 'USER')) {  // Usa l'interfaccia Roles
            this.router.navigate(['/user']);
          } else {
            this.router.navigate(['/']);
          }
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}
