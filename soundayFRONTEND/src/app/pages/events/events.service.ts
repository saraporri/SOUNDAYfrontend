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

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getAll(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getArtistById(artistId: number): Observable<IUser> {
    return this.http.get<IUser>(`${environment.apiUrl}/users/${artistId}`, { headers: this.getAuthHeaders() });
  }

  toggleLike(eventId: number, liked: boolean): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/${eventId}/like`,
      { liked },
      { headers: this.getAuthHeaders() }
    );
  }
  addEvent(eventData: FormData): Observable<any> {    const token = this.authService.getToken();
     new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(this.apiUrl, eventData);
  }

  getEventById(id: number): Observable<IEvent> {
    return this.http.get<IEvent>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  updateEvent(event: IEvent): Observable<IEvent> {
    return this.http.put<IEvent>(`${this.apiUrl}/${event.id}`, event);
  }
  deleteEvent(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
