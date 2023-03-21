import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventStore} from "../../stores/EventStore";
import { Event } from '../../models/Event';
import * as humanizeDuration from "humanize-duration";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {
  id?: string | null;

  event?: Event;

  relativeTime?: boolean = false;

  constructor(private route: ActivatedRoute, public eventStore: EventStore) {  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id != null) {
      this.eventStore.getEvent(this.id).subscribe((event: Event) => {
        this.event = event;
      });
      this.eventStore.getRelativeTime().subscribe((relativeTime: boolean) => {
        this.relativeTime = relativeTime;
      });
    }
  }

  relativeTimeText() {
    if (this.event != null && this.relativeTime != null) {
      return this.relativeTime ? humanizeDuration(this.event.date.getTime() - new Date().getTime(), {
        largest: 2,
        round: true
      }) : this.event.date.toDateString();
    } else {
      return this.event?.date.toDateString();
    }
  }

  onToggleDate() {
    this.eventStore.toggleRelativeTime();
  }
}
