import {Express} from "express";
import { convertEventToFrontendEvent, EventModel, Event, FrontendEvent } from "./Event";
import AWS, {DeleteObjectCommand, PutObjectCommand, S3} from "@aws-sdk/client-s3";
import {Multer} from "multer";
import mime from "mime-types";
import { v4 as uuidv4 } from 'uuid';
import parseISO from "date-fns/parseISO";

export const routes = (app: Express, s3: S3, upload: Multer) => {

    app.get('/about', (request, response) => {
        response.json({ "Language": "Typescript", "Framework": "Express", "Database": "Mongo", "Cloud": "AWS" });
    });

    app.get('/events', async (request, response) => {
        const events: Event[] = await EventModel.find();
        const frontendEvents: FrontendEvent[] = events.map((event: Event) => convertEventToFrontendEvent(event));
        await response.json(frontendEvents);
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

    app.get('/events/:event', async (request, response) => {
        const eventID: string = request.params.event as string;
        const event = await EventModel.findById(eventID);
        const frontendEvent: FrontendEvent = convertEventToFrontendEvent(event as unknown as Event);
        response.json(frontendEvent);
    });

    app.patch('/events/:event', upload.single('picture'), async (request, response) => {
        const eventID: string = request.params.event as string;
        const previousEvent = await EventModel.findById(eventID);

        const updatedObject = {};

        // Upload to S3
        if (request.body.patchedPicture) {
            const key = eventID + "." + mime.extension(request.file.mimetype);
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
            updatedObject['picture'] = process.env.S3_BUCKET_URL + key;
        }

        if (previousEvent.name !== request.body.name) {
            updatedObject['name'] = request.body.name;
        }

        if (previousEvent.fullDay !== request.body.fullDay) {
            updatedObject['fullDay'] = request.body.fullDay;
        }

        console.log(request.body.date, previousEvent.date);
        if (request.body.date !== undefined) {
            const date = parseISO(request.body.date);
            if (previousEvent.date.getTime() === date.getTime()) {
                updatedObject['date'] = request.body.date;
            }
        }

        // Save to MongoDB
        await EventModel.findByIdAndUpdate(eventID, updatedObject);
        response.send(true);
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