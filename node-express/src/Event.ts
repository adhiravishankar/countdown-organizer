import mongoose, {Schema} from "mongoose";
import {ObjectId} from "mongodb";

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
