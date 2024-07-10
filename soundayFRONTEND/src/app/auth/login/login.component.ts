import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ILogin } from '../../models/i-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginData:ILogin = {
    username: '',
    password: '',
    role:""
  }

  constructor(
    private authSvc:AuthService,
    private router:Router
    ){}

    signIn(){
      this.authSvc.login(this.loginData)
      .subscribe(data => {
        if (data.role === 'fan') {
          this.router.navigate(['/user']);
        } else if (data.role === 'artist') {
          this.router.navigate(['/artist']);
        } else {
          this.router.navigate(['/']);
        }
      });
  }
}
