import { HttpClient } from "@angular/common/http";
import {Injectable, Injector} from "@angular/core";
import {NgSimpleStateBaseStore, NgSimpleStateStoreConfig} from "ng-simple-state";
import {Event} from "../../models/Event";
import {environment} from "../../environments/environment";

export interface EventState {
  events: Map<string, Event>;

  eventsList: Event[];
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
      date: new Date(2023, 4, 6),
      fullDay: true,
      picture: "https://commencement.iu.edu/images/commencement-iu-banner-2.jpg",
      _id: 'ee221e0a-b967-47e7-a9d2-3a52d7105c12',
      name: 'IU Commencement'
    };
    const event2: Event = {
      date: new Date(2023, 4, 27),
      fullDay: true,
      picture: "https://www.theknot.com/tk-media/images/67c22f44-1897-47c0-88df-2aac52b4ab71~rt_auto-cr_0.276.3600.2075-rs_1280.h?ordering=explicit",
      _id: '6a0f55e0-04ed-4679-9c41-d670aa6c19f5',
      name: 'Christine\'s Wedding'
    };
    const event3: Event = {
      date: new Date(2023, 3, 15),
      fullDay: true,
      picture: "https://images.zola.com/27fc7d83-c798-4504-a0ca-0582ea1c23c2?h=1400",
      _id: '6a0f55e0-04ed-4679-9c41-d670aa6c19f6',
      name: 'Will and Zoe\'s Wedding'
    }
    eventsMap.set(event1._id, event1);
    eventsMap.set(event2._id, event2);
    eventsMap.set(event3._id, event3);
    return { events: eventsMap, eventsList: [event1, event2, event3] };
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
