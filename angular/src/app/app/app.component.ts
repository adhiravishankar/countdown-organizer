import { Component } from '@angular/core';
import {EventStore} from "../../stores/EventStore";
import {AddNewEventComponent} from "../add-new-event/add-new-event.component";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, NavigationEnd, Router, UrlSegment} from "@angular/router";
import {APIService} from "../../api/api.service";
import {EditEventComponent} from "../edit-event/edit-event.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Event Countdown';

  showDeleteIcon: boolean = false;

  constructor(public eventStore: EventStore, public api: APIService, public dialog: MatDialog, private route: ActivatedRoute, private router: Router) {
  }

  async ngOnInit() {
    await this.eventStore.fetchEvents();
    this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
            this.showDeleteIcon = event.url.includes('/events/');
        }
    });
  }

  addEvent(): void {
    this.dialog.open(AddNewEventComponent, { width: '30rem', enterAnimationDuration: '0ms', exitAnimationDuration: '0ms' });
  }

  async delete() {
    const url = this.router.url;
    const id = url.substring(url.lastIndexOf('/') + 1);
    const response = await this.api.deleteEvent(id);
    console.log(response);
    response.subscribe(async (resp) => {
      console.log(resp);
      if (response) {
        await this.eventStore.fetchEvents();
        await this.router.navigateByUrl('/');
      }
    });
  }

  edit() {
    const url = this.router.url;
    const id = url.substring(url.lastIndexOf('/') + 1);
    this.dialog.open(EditEventComponent, { data: { id }, width: '30rem', enterAnimationDuration: '0ms', exitAnimationDuration: '0ms' });
  }
}
