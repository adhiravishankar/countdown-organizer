import {Component} from '@angular/core';
import {EventStore} from "../stores/EventStore";
import { Event } from "../../models/Event";
import {MatDialog} from "@angular/material/dialog";
import {AddNewEventComponent} from "../add-new-event/add-new-event.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  events: Map<string, Event>;

  constructor(public eventStore: EventStore) {
    this.events = this.eventStore.getEvents();
  }
}
