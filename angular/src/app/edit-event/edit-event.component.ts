import {Component, Inject} from '@angular/core';
import {APIService} from "../../api/api.service";
import {EventStore} from "../../stores/EventStore";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

interface DialogData {
  id: string;
}

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent {

  name: string = "";

  fullDay: boolean = false;

  date: Date = new Date();

  patchedPicture: boolean = false;

  selectedFile?: File = undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public apiService: APIService, public eventStore: EventStore, private router: Router, public dialogRef: MatDialogRef<EditEventComponent>) {
    this.eventStore.getEvent(data.id).subscribe((event) => {
      this.name = event.name;
      this.fullDay = event.fullDay;
      this.date = event.date;
    });
  }

  onFileSelected(event: any): void {
    this.patchedPicture = true;
    this.selectedFile = event.target.files[0];
  }

  async onSubmit() {
    const response = await this.apiService.editEvent(this.data.id, this.name, this.fullDay, this.date, this.patchedPicture, this.selectedFile);
    response.subscribe(async (value) => {
      if (value) {
        await this.eventStore.fetchEvents();
        this.dialogRef.close();
      }
    });
  }
}
