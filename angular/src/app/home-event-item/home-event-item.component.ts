import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-home-event-item',
  templateUrl: './home-event-item.component.html',
  styleUrls: ['./home-event-item.component.css']
})
export class HomeEventItemComponent {

  @Input() event?: Event;

  constructor() { }

  ngOnInit(): void {
  }

}
