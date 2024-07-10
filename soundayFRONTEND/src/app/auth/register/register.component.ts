import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../authservice.service';
import { Router } from '@angular/router';
import { IUser } from '../../models/i-user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @Output() closeModal = new EventEmitter<void>();

  selectedRole: string = '';
  registerData: IUser = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    roles: '',
    id: 0,
    followersCount: 0,
    likeEvents: 0,
    likeArtists: 0,
    events: [],
    partecipation: 0
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRoleChange(event: any): void {
    this.selectedRole = event.target.value;
    this.registerData.roles = this.selectedRole;
  }

  signUp(): void {
    if (this.selectedRole === 'fan') {
      this.authService.registerUser(this.registerData).subscribe(
        (response) => {
          this.authService.setToken(response.token);
          this.authService.setUser(response.user);
          this.router.navigate(['/user']);
          this.closeModal.emit();
        },
        (error) => {
          this.errorMessage = 'Registration failed. Please try again.';
          console.error(error);
        }
      );
    } else if (this.selectedRole === 'artist') {
      this.authService.registerArtist(this.registerData).subscribe(
        (response) => {
          this.authService.setToken(response.token);
          this.authService.setUser(response.user);
          this.router.navigate(['/artist']);
          this.closeModal.emit();
        },
        (error) => {
          this.errorMessage = 'Registration failed. Please try again.';
          console.error(error);
        }
      );
    }
  }
}
