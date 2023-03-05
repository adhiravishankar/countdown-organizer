import { HttpClient } from "@angular/common/http";
import {Injectable, Injector} from "@angular/core";
import {NgSimpleStateBaseStore, NgSimpleStateStoreConfig} from "ng-simple-state";
import {Event} from "../../models/Event";
import {environment} from "../../environments/environment";

export interface EventState {
  events: Map<string, Event>;
}

@Injectable()
export class EventStore extends NgSimpleStateBaseStore<EventState> {

  constructor(injector: Injector, private http: HttpClient) {
    super(injector);
  }

  storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: 'EventStore'
    };
  }

  initialState(): EventState {
    const eventsMap = new Map<string, Event>();
    const event1: Event = {
      fullDay: true,
      picture: "",
      _id: 'ee221e0a-b967-47e7-a9d2-3a52d7105c12',
      name: 'IU Commencement'
    };
    eventsMap.set(event1._id, event1);
    return { events: eventsMap };
  }

  fetchEvents() {
    return this.http.get<Event[]>(environment.apiURL + "events").subscribe((events: Event[]) => {
      const eventsMap = new Map<string, Event>();
      events.forEach((event: Event) => eventsMap.set(event._id, event));
      this.setState(() => ({ events: eventsMap }), 'fetch');
    });
  }

  getEvents(): Map<string, Event> {
    return this.state.value.events;
  }

  getEvent(id: string) {
    return this.state.value.events.get(id);
  }
}
