
export interface Event {
    _id: string;

    name: string;

    date: Date;

    picture: string;

    fullDay: boolean;
}

export interface ReceivedEvent {
  _id: string;

  name: string;

  date: string;

  picture: string;

  fullDay: boolean;
}
