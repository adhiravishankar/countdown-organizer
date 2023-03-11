import {Express} from "express";
import {IncomingMessage, NextFunction} from "connect";
import {ServerResponse} from "http";
import {EventModel} from "./Event";
import AWS, {DeleteObjectCommand, PutObjectCommand, S3} from "@aws-sdk/client-s3";
import {Multer} from "multer";
import mime from "mime-types";
import { v4 as uuidv4 } from 'uuid';


export type NextHandleFunction = (req: IncomingMessage, res: ServerResponse, next: NextFunction) => void;

export const routes = (app: Express, s3: S3, upload: Multer) => {

    app.get('/about', (request, response) => {
        response.json({ "Language": "Go", "Framework": "Gin", "Database": "Mongo", "Cloud": "AWS" });
    });

    app.get('/events', async (request, response) => {
        const events = await EventModel.find();
        await response.json(events);
    });

    app.post('/events', upload.single('picture'), async (request, response) => {
        const uuid = uuidv4();

        // Upload to S3
        const key = uuid + "." + mime.extension(request.file.mimetype);
        const s3Params = new PutObjectCommand({
            ACL: 'public-read',
            Bucket: process.env.S3_BUCKET,
            Key: key,
            Body: request.file.buffer,
        });
        try {
            await s3.send(s3Params);
        } catch (err) {
            console.error(err);
        }

        // Save to MongoDB
        const event = new EventModel({
            _id: uuid,
            name: request.body.name,
            picture: process.env.S3_BUCKET_URL + key,
            fullDay: request.body.fullDay,
            date: request.body.date,
        });
        await event.save();


        response.send(uuid)
    });

    app.get('/events/:event', (request, response) => {
        const eventID: string = request.params.event as string;
        const event = EventModel.findById(eventID);
        response.json(event);
    });

    app.patch('/events/:event', (request, response) => {

    });

    app.delete('/events/:event', async (request, response) => {
        const eventID: string = request.params.event as string;
        const event = await EventModel.findByIdAndDelete(eventID);

        // Upload to S3
        const key = event.picture.substring(process.env.S3_BUCKET_URL.length);
        const s3Params = new DeleteObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key });
        try {
            await s3.send(s3Params);
        } catch (err) {
            response.json(err);
        }
        response.json(true);
    });
};