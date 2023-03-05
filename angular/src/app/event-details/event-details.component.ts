import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventStore} from "../stores/EventStore";
import { Event } from '../../models/Event';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {
  id?: string | null;

  event?: Event;

  constructor(private route: ActivatedRoute, public eventStore: EventStore) {  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id != null) {
      this.event = this.eventStore.getEvent(this.id);
    }
  }
}
