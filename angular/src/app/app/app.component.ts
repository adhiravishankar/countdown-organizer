import { Component } from '@angular/core';
import {EventStore} from "../../stores/EventStore";
import {AddNewEventComponent} from "../add-new-event/add-new-event.component";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, NavigationEnd, Router, UrlSegment} from "@angular/router";
import {APIService} from "../../api/api.service";

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
            if (event.url.includes('/events/')) {
              this.showDeleteIcon = true;
            }
        }
    });
  }

  addEvent(): void {
    this.dialog.open(AddNewEventComponent, { width: '30rem', enterAnimationDuration: '0ms', exitAnimationDuration: '0ms' });
  }

  delete() {
    const url = this.router.url;
    const id = url.substring(url.lastIndexOf('/') + 1);
    this.api.deleteEvent(id).subscribe(async () => {
      await this.router.navigate(['']);
    });
  }

  edit() {
    const url = this.router.url;
    const id = url.substring(url.lastIndexOf('/') + 1);
  }
}
