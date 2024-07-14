import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Iregister } from '../../models/iregister';
import { Iroles } from '../../models/iroles';
import { Artist } from '../../models/Iartist';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerData: Iregister = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    roles: [] as Iroles[]
  };

  artist: Artist = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    roles: [] as Iroles[]
  };

  selectedRole: string = '';

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) {}

  onRoleChange(event: any) {
    this.selectedRole = event.target.value;
  }

  signUp() {
    if (this.selectedRole === 'fan') {
      this.registerData.roles = [{ roleType: 'USER' }]; // Set the role to USER
      this.authSvc.registerUser(this.registerData).subscribe(
        (response) => {
          if (response && response.token && response.user) {
            this.authSvc.setToken(response.token);
            this.authSvc.setUser(response.user);
            this.router.navigate(['login']);
          } else {
            console.error('Invalid response', response);
          }
        },
        (error: any) => {
          console.error('Registration failed', error);
        }
      );
    } else {
      // Copy user data to artist object
      this.artist.firstName = this.registerData.firstName;
      this.artist.lastName = this.registerData.lastName;
      this.artist.email = this.registerData.email;
      this.artist.password = this.registerData.password;
      this.artist.roles = [{ roleType: 'ARTIST' }]; // Set the role to ARTIST

      this.authSvc.registerArtist(this.artist).subscribe(
        (response) => {
          if (response && response.token && response.user) {
            this.authSvc.setToken(response.token);
            this.authSvc.setUser(response.user);
            this.router.navigate(['login']);
          } else {
            console.error('Invalid response', response);
          }
        },
        (error: any) => {
          console.error('Registration failed', error);
        }
      );
    }
  }
}
