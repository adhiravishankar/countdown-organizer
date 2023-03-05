import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {
  id?: string | null;

  constructor(private route: ActivatedRoute) {  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }
}
