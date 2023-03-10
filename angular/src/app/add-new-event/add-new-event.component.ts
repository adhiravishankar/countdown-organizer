import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {APIService} from "../../api/api.service";

@Component({
  selector: 'app-add-new-event',
  templateUrl: './add-new-event.component.html',
  styleUrls: ['./add-new-event.component.css']
})
export class AddNewEventComponent {
  name: string = "";

  fullDay: boolean = false;

  date: Date = new Date();

  constructor(public apiService: APIService, public dialogRef: MatDialogRef<AddNewEventComponent>) {}

  selectedFile: any = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  onSubmit() {
    this.apiService.addEvent(this.name, this.selectedFile, this.fullDay, this.date).then(() => this.dialogRef.close());
  }

}
