import {Express} from "express";
import {IncomingMessage, NextFunction} from "connect";
import {ServerResponse} from "http";
import {EventModel} from "./Event";

export type NextHandleFunction = (req: IncomingMessage, res: ServerResponse, next: NextFunction) => void;

export const routes = (app: Express, urlEncodedParser: NextHandleFunction) => {

    app.get('/about', (request, response) => {
        response.json({ "Language": "Go", "Framework": "Gin", "Database": "Mongo", "Cloud": "AWS" });
    });

    app.get('/events', async (request, response) => {
        const events = await EventModel.find();
        await response.json(events);
    });

    app.post('/events', urlEncodedParser, (request, response) => {
        // parse an event from the request body
        // const event = request.body as EventModel;
        response.json(request.body)
    });

    app.get('/events/:event', (request, response) => {
        const eventID: string = request.params.event as string;
        const event = EventModel.findById(eventID);
        response.json(event);
    });

    app.patch('/events/:event',urlEncodedParser, (request, response) => {
        response.json({ "Language": "Go", "Framework": "Gin", "Database": "Mongo", "Cloud": "AWS" });
    });

    app.delete('/events/:event', (request, response) => {
        const eventID: string = request.params.event as string;
        const success = EventModel.findByIdAndDelete(eventID);
        response.json(success);
    });
};