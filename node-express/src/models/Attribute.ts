import mongoose, {Schema} from "mongoose";
import {ObjectId} from "mongodb";

export interface Attribute {

    _id: string;

    name: string;

    cologneID: string;

}

export const AttributeSchema = new Schema({
   _id: ObjectId,
   name: String,
   cologneID: String,
});

export const AttributeModel = mongoose.model('Attribute', AttributeSchema);

