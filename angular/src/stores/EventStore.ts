import { HttpClient } from "@angular/common/http";
import {Injectable, Injector} from "@angular/core";
import {NgSimpleStateBaseStore, NgSimpleStateStoreConfig} from "ng-simple-state";
import {Event, ReceivedEvent} from "../models/Event";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import parseISO from "date-fns/parseISO";

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
    return { events: eventsMap, eventsList: [] };
  }

  fetchEvents() {
    const url = environment.apiURL + "/events";
    return this.http.get<ReceivedEvent[]>(url).subscribe((events: ReceivedEvent[]) => {
      const eventsMap = new Map<string, Event>();
      const eventsList: Event[] = [];
      events.forEach((event: ReceivedEvent) => {
        const date = parseISO(event.date);
        eventsMap.set(event._id, { ...event, date });
        eventsList.push({ ...event, date });
      });
      this.setState(() => ({ events: eventsMap, eventsList }), 'fetch');
    });
  }

  getEvents(): Observable<EventState> {
    return this.selectState(state => state);
  }

  getEvent(id: string): Observable<Event> {
    return this.selectState(state => state.events.get(id) as Event);
  }
}
