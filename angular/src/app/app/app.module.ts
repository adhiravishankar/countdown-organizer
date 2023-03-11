import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from '../home/home.component';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { HomeEventItemComponent } from '../home-event-item/home-event-item.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatGridListModule} from "@angular/material/grid-list";
import {NgSimpleStateModule} from "ng-simple-state";
import {environment} from "../../environments/environment";
import {EventStore} from "../../stores/EventStore";
import { AddNewEventComponent } from '../add-new-event/add-new-event.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {EditEventComponent} from "../edit-event/edit-event.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventDetailsComponent,
    HomeEventItemComponent,
    AddNewEventComponent,
    PageNotFoundComponent,
    EditEventComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'events/:id', component: EventDetailsComponent},
      {path: '**', component: PageNotFoundComponent}
    ]),
    NgSimpleStateModule.forRoot({
      enableDevTool: !environment.production, // Enable Redux DevTools only in development mode
      enableLocalStorage: false // Local storage state persistence is globally disabled
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatGridListModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [EventStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
