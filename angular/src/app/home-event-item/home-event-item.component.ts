import {Component, Input} from '@angular/core';
import { Event } from '../../models/Event';

@Component({
  selector: 'app-home-event-item',
  templateUrl: './home-event-item.component.html',
  styleUrls: ['./home-event-item.component.css']
})
export class HomeEventItemComponent {

  @Input() id?: string;

  @Input() event?: Event;

  dateString?: string;

  constructor() { }

  ngOnInit(): void {
    console.log(this.event);
    this.dateString = this.event?.fullDay ? this.event?.date.toDateString() : this.event?.date.toLocaleString()
  }

}
