import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Event} from "../../models/Event";

@Injectable({
  providedIn: 'root'
})
export class APIService {
  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(environment.apiURL + "/events");
  }

  addEvent(id: string): Observable<boolean> {
    return this.http.get<boolean>(environment.apiURL + "/events/" + id);
  }

  deleteEvent(id: string): Observable<boolean> {
    return this.http.get<boolean>(environment.apiURL + "/events/" + id);
  }


}
