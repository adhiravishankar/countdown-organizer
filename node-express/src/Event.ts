import mongoose, {Schema} from "mongoose";

export interface Event {
    _id: string;

    name: string;

    date: Date;

    fullDay: boolean;

    picture: string;
}


export const EventSchema = new Schema({
    _id: String,
    name: String,
    date: Date,
    picture: String,
    fullDay: Boolean,
});

export const EventModel = mongoose.model('Event', EventSchema);

export interface FrontendEvent {

    id: string;

    name: string;

    date: Date;

    fullDay: boolean;

    picture: string;

}

export function convertEventToFrontendEvent(event: Event): FrontendEvent {
    return {
        id: event._id,
        name: event.name,
        date: event.date,
        fullDay: event.fullDay,
        picture: event.picture,
    }
}