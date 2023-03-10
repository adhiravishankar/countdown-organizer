import { Component } from '@angular/core';
import {EventStore} from "../../stores/EventStore";
import {AddNewEventComponent} from "../add-new-event/add-new-event.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Event Countdown';

  constructor(public eventStore: EventStore, public dialog: MatDialog) {
    // this.eventStore.fetchEvents();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddNewEventComponent, { width: '30rem', enterAnimationDuration, exitAnimationDuration });
  }
}
