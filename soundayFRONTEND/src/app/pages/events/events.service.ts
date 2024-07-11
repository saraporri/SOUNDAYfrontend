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
export class EventService {
  private apiUrl = `${environment.apiUrl}/events`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAll(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(this.apiUrl);
  }

  getArtistById(artistId: number): Observable<IUser> {
    return this.http.get<IUser>(`${environment.apiUrl}/users/${artistId}`);
  }

  toggleLike(eventId: number, liked: boolean): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    return this.http.post<any>(`${this.apiUrl}/${eventId}/like`, { liked }, { headers });
  }
}
