import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../models/i-user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  selectedRole: string = '';
  registerData: Partial<IUser> = {
    username: "",
    password: "",
    name: "",
    lastName: "",
    email: "",
    role: ""
  };

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) {}

  signUp() {
    this.registerData.role = this.selectedRole; 
    this.authSvc.register(this.registerData)
      .subscribe(data => {
        this.router.navigate(['/']);
      });
  }

  onRoleChange(event: any) {
    this.selectedRole = event.target.value;
  }
}
