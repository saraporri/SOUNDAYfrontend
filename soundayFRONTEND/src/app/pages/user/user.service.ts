import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/auth.service';
import { IEvent } from '../../models/i-event';
import { IUser } from '../../models/i-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  updateUser(user: IUser): Observable<IUser> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json',
    });
    return this.http.put<IUser>(`${this.apiUrl}/${user.id}`, user, { headers });
  }

  uploadProfilePicture(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    return this.http.post<{ url: string }>(`${this.apiUrl}/upload`, formData, {
      headers,
    });
  }

  getEvents(): Observable<IEvent[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    return this.http.get<IEvent[]>(`${environment.apiUrl}/events`, { headers });
  }

  getArtists(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}/artists`);
  }

  likeArtist(userId: number, artistId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/likeArtist/${userId}/${artistId}`, {});
  }
}
