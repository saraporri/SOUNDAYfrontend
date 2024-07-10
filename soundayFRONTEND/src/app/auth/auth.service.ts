import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IUser } from '../models/i-user';
import { ILogin } from '../models/i-login';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  restore() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = `${environment.apiUrl}`;
  private jwtHelper: JwtHelperService;
  authSubject: any;
  user$: any;

  constructor(private http: HttpClient) {
    this.jwtHelper = new JwtHelperService();
    this.restoreUser();
  }

  registerUser(user: IUser): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register/users`, user);
  }

  registerArtist(artist: IUser): Observable<any> {
    artist.roles = 'artist';
    return this.http.post<any>(`${this.apiUrl}/users/registerArtist`, artist);
  }

  login(credentials: ILogin): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/login`, credentials);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
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

  restoreUser(): void {
    const userJson = localStorage.getItem('accessData');
    if (!userJson) return;

    const accessData = JSON.parse(userJson);
    if (this.jwtHelper.isTokenExpired(accessData.token)) return;

    this.authSubject.next(accessData.user);
    this.autoLogout(accessData.token);
  }

  autoLogout(token: string): void {
    const expDate = this.jwtHelper.getTokenExpirationDate(token) as Date;
    const expMs = expDate.getTime() - new Date().getTime();
    setTimeout(() => {
      this.logout();
    }, expMs);
  }

  logout(): void {
    this.authSubject.next(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
