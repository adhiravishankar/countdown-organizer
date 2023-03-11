import {Component} from '@angular/core';
import {EventStore} from "../../stores/EventStore";
import { Event } from "../../models/Event";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  events: Map<string, Event> | undefined;

  constructor(public eventStore: EventStore) {
    this.eventStore.getEvents().subscribe((state) => {
      this.events = state.events;
    });
  }
}
