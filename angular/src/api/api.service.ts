import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class APIService {
  constructor(private http: HttpClient) { }

  addEvent(name: string, picture: File, fullDay: boolean, date: Date): Observable<boolean> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const event = this.createEventParams(name, picture, fullDay, date);
    return this.http.post<boolean>(environment.apiURL + "/events/", event, { headers: headers });
  }

  editEvent(id: string, name: string, picture: File, fullDay: boolean, date: Date): Observable<boolean> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const event = this.createEventParams(name, picture, fullDay, date);
    return this.http.patch<boolean>(environment.apiURL + "/events/" + id, event, {  headers: headers });
  }

  deleteEvent(id: string): Observable<boolean> {
    return this.http.delete<boolean>(environment.apiURL + "/events/" + id);
  }

  private createEventParams(name: string, picture: File, fullDay: boolean, date: Date) {
    let event = new FormData();
    event.append("name", name);
    event.append("picture", picture);
    event.append("fullDay", fullDay.toString());
    event.append("date", date.toISOString());
    return event;
  }


}
