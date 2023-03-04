import mongoose, {Schema} from "mongoose";
import {ObjectId} from "mongodb";

export interface Cologne {
    _id: string;

    name: string;

    purchased: boolean;

    picture: string;

    manufacturerID: string;
}


export const CologneSchema = new Schema({
    _id: ObjectId,
    name: String,
    purchased: Boolean,
    picture: String,
    manufacturerID: String,
});

export const CologneModel = mongoose.model('Cologne', CologneSchema);
