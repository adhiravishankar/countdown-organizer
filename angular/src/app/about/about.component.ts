import { Component } from '@angular/core';
import {APIService} from "../../api/api.service";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  aboutMap: Map<string, any> = new Map<string, any>();

  constructor(private service: APIService) { }

  async ngOnInit() {
    const response = await this.service.about();
    response.subscribe((value: HttpResponse<string>) => {
      if (typeof value.body === "string") {
        const aboutValues = JSON.parse(value.body);
        Object.entries(aboutValues).forEach(([key, value]) => {
          this.aboutMap.set(key, value);
        });
      }
    });
    this.aboutMap.set('Frontend', 'Angular');
    this.aboutMap.set('Store', 'NG-Simple-State');
    this.aboutMap.set('Styling Frameworks', 'Material UI');
  }


}
