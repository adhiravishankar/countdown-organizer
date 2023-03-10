import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventStore} from "../../stores/EventStore";
import { Event } from '../../models/Event';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {
  id?: string | null;

  event?: Event;

  dateString?: string;

  showDate: 'date' | 'relative' = 'date';

  constructor(private route: ActivatedRoute, public eventStore: EventStore) {  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id != null) {
      this.event = this.eventStore.getEvent(this.id);
    }
    this.dateString = this.event?.fullDay ? this.event?.date.toDateString() : this.event?.date.toLocaleString()
  }

  onToggleDate() {
    this.showDate = this.showDate === 'date' ? 'relative' : 'date';
  }
}
