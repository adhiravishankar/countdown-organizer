import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from '../home/home.component';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { HomeEventItemComponent } from '../home-event-item/home-event-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventDetailsComponent,
    HomeEventItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }