
export interface Event {
    id: string;

    name: string;

    date: Date;

    picture: string;

    fullDay: boolean;
}

export interface ReceivedEvent {
  id: string;

  name: string;

  date: string;

  picture: string;

  fullDay: boolean;
}

export interface PatchEvent extends Event {
  changedPicture: boolean;
}
