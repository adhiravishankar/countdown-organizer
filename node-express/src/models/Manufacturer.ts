import mongoose, {Schema} from "mongoose";
import {ObjectId} from "mongodb";

export interface Manufacturer {
    _id: string;

    name: string;

    description: string;

    picture: string;
}

export const ManufacturerSchema = new Schema({
    _id: ObjectId,
    name: String,
    description: String,
    picture: String,
});

export const ManufacturerModel = mongoose.model('Manufacturer', ManufacturerSchema);
