import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class APIService {
  constructor(private http: HttpClient) { }

  addEvent(name: string, picture: File, fullDay: boolean, date: Date): Observable<HttpResponse<string>> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const event = this.createEventParams(name, fullDay, date, picture);
    return this.http.post(environment.API_URL + "/events/", event, { headers: headers, observe: 'response', responseType: 'text' });
  }

  editEvent(id: string, name: string, fullDay: boolean, date: Date, patchedPicture: boolean, picture?: File): Observable<HttpResponse<string>> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const event = this.createEventParams(name, fullDay, date, picture, patchedPicture);
    return this.http.patch(environment.API_URL + "/events/" + id, event, {  headers: headers, observe: 'response', responseType: 'text' });
  }

  deleteEvent(id: string): Observable<HttpResponse<string>> {
    return this.http.delete(environment.API_URL + "/events/" + id, {  observe: 'response', responseType: 'text' });
  }

  private createEventParams(name: string, fullDay: boolean, date: Date, picture?: File, patchedPicture?: boolean) {
    let event = new FormData();
    event.append("name", name);
    event.append("fullDay", fullDay.toString());
    event.append("date", date.toISOString());
    if (picture !== undefined) {
      event.append("picture", picture);
    }
    if (patchedPicture) {
      event.append("patchedPicture", true.toString());
    }
    return event;
  }


}
