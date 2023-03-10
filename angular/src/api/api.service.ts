import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class APIService {
  constructor(private http: HttpClient) { }

  async addEvent(name: string, picture: File, fullDay: boolean, date: Date): Promise<Observable<boolean>> {
    const event = await this.createEventParams(name, picture, fullDay, date);
    return this.http.post<boolean>(environment.apiURL + "/events/", event);
  }

  async editEvent(id: string, name: string, picture: File, fullDay: boolean, date: Date): Promise<Observable<boolean>> {
    const event = await this.createEventParams(name, picture, fullDay, date);
    return this.http.patch<boolean>(environment.apiURL + "/events/" + id, event);
  }

  deleteEvent(id: string): Observable<boolean> {
    return this.http.delete<boolean>(environment.apiURL + "/events/" + id);
  }

  private async createEventParams(name: string, picture: File, fullDay: boolean, date: Date) {
    let event = new HttpParams();
    event = event.append("name", name);
    event = event.append("picture", await picture.text());
    event = event.append("fullDay", fullDay.toString());
    return event.append("date", date.toISOString());
  }


}
