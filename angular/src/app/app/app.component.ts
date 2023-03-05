import { Component } from '@angular/core';
import {EventStore} from "../stores/EventStore";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Event Countdown';

  constructor(public eventStore: EventStore) {
    this.eventStore.fetchEvents();
  }
}
