import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IUser } from '../models/i-user';
import { ILogin } from '../models/i-login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  registerUser(user: IUser): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/register`, user);
  }

  registerArtist(artist: IUser): Observable<any> {
    artist.roles = 'artist';
    return this.http.post<any>(`${this.apiUrl}/users/registerArtist`, artist);
  }

  login(loginData: ILogin): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginData);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setUser(user: IUser): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): IUser | null {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      return JSON.parse(userJson) as IUser;
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isArtist(): boolean {
    const user = this.getUser();
    return !!(user && user.roles === 'artist');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
