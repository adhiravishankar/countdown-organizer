import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class APIService {
  constructor(private http: HttpClient) { }

  addEvent(name: string, picture: string, fullDay: boolean): Observable<boolean> {
    return this.http.post<boolean>(environment.apiURL + "/events/", {name, picture, fullDay});
  }

  deleteEvent(id: string): Observable<boolean> {
    return this.http.delete<boolean>(environment.apiURL + "/events/" + id);
  }


}
