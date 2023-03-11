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
    const event = this.createEventParams(name, picture, fullDay, date);
    return this.http.post(environment.apiURL + "/events/", event, { headers: headers, observe: 'response', responseType: 'text' });
  }

  editEvent(id: string, name: string, picture: File, fullDay: boolean, date: Date, patchedPicture: boolean): Observable<boolean> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const event = this.createEventParams(name, picture, fullDay, date, patchedPicture);
    return this.http.patch<boolean>(environment.apiURL + "/events/" + id, event, {  headers: headers });
  }

  deleteEvent(id: string): Observable<boolean> {
    return this.http.delete<boolean>(environment.apiURL + "/events/" + id);
  }

  private createEventParams(name: string, picture: File, fullDay: boolean, date: Date, patchedPicture?: boolean) {
    let event = new FormData();
    event.append("name", name);
    event.append("picture", picture);
    event.append("fullDay", fullDay.toString());
    event.append("date", date.toISOString());
    if (patchedPicture) {
      event.append("patchedPicture", true.toString());
    }
    return event;
  }


}
