import mongoose, {Schema} from "mongoose";
import {ObjectId} from "mongodb";

export interface Event {
    _id: string;

    name: string;

    purchased: boolean;

    picture: string;

    manufacturerID: string;
}


export const EventSchema = new Schema({
    _id: ObjectId,
    name: String,
    date: String,
    picture: String,
});

export const EventModel = mongoose.model('Event', EventSchema);
