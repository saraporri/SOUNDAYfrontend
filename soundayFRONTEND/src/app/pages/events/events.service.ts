import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/auth.service';
import { IEvent } from '../../models/i-event';
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

  getLikedEvents(userId: number): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(`${this.apiUrl}/liked?userId=${userId}`, { headers: this.getAuthHeaders() });
  }

  getParticipatedEvents(userId: number): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(`${this.apiUrl}/participated?userId=${userId}`, { headers: this.getAuthHeaders() });
  }

  toggleLike(eventId: number, userId: number): Observable<any> {
    const body = { userId }; // Ensure the body contains the userId
    return this.http.post<any>(`${this.apiUrl}/${eventId}/like`, body, { headers: this.getAuthHeaders() });
  }

  participateEvent(eventId: number, userId: number): Observable<any> {
    const body = { userId };
    return this.http.post<any>(`${this.apiUrl}/${eventId}/participate`, body, { headers: this.getAuthHeaders(), observe: 'response' });
  }




  addEvent(eventData: FormData): Observable<any> {
    const headers = this.getAuthHeaders();
    headers.delete('Content-Type'); // FormData will set its own content type

    return this.http.post<any>(this.apiUrl, eventData, { headers });
  }

  getEventById(id: number): Observable<IEvent> {
    return this.http.get<IEvent>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  updateEvent(event: IEvent): Observable<IEvent> {
    return this.http.put<IEvent>(`${this.apiUrl}/${event.id}`, event, { headers: this.getAuthHeaders() });
  }

  deleteEvent(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}

