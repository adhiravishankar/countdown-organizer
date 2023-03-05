import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class APIService {
  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<Event[]>(environment.apiURL + "/events");
  }

  addEvent(id: string) {
    return this.http.get<boolean>(environment.apiURL + "/events/" + id);
  }

  deleteEvent(id: string) {
    return this.http.get<boolean>(environment.apiURL + "/events/" + id);
  }


}
