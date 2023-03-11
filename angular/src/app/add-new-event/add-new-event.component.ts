import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import { Router } from '@angular/router';
import {APIService} from "../../api/api.service";
import {EventStore} from "../../stores/EventStore";

@Component({
  selector: 'app-add-new-event',
  templateUrl: './add-new-event.component.html',
  styleUrls: ['./add-new-event.component.css']
})
export class AddNewEventComponent {
  name: string = "";

  fullDay: boolean = false;

  date: Date = new Date();

  selectedFile?: File = undefined;

  constructor(public apiService: APIService, public eventStore: EventStore, private router: Router, public dialogRef: MatDialogRef<AddNewEventComponent>) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  async onSubmit() {
    if (this.selectedFile !== undefined) {
      const response = await this.apiService.addEvent(this.name, this.selectedFile, this.fullDay, this.date);
      response.subscribe(async (value) => {
        if (value) {
          await this.eventStore.fetchEvents();
          this.dialogRef.close();
        }
      });
    }
  }

}
