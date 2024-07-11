import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { ILogin } from '../models/i-login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Iregister } from '../models/iregister';
import { IUser } from '../models/i-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private authSubject = new BehaviorSubject<IUser | null>(null);
  public user$ = this.authSubject.asObservable();

  constructor(private http: HttpClient) {
    this.restoreUser();
  }

  registerUser(user: Iregister): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/register`, user);
  }

  registerArtist(artist: Iregister): Observable<any> {
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
    this.authSubject.next(user);
  }

  getUser(): IUser | null {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      return JSON.parse(userJson) as IUser;
    }
    return null;
  }
  restoreUser(): void {
    const userJson = localStorage.getItem('user');
    if (!userJson) return;

    try {
      const user = JSON.parse(userJson);
      const token = this.getToken();
      if (token && !this.jwtHelper.isTokenExpired(token)) {
        this.authSubject.next(user);
        this.autoLogout(token);
      }
    } catch (e) {
      console.error('Error parsing user data from localStorage', e);
    }
  }

  restore(): void {
    this.restoreUser();
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
