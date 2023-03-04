import {IncomingMessage, NextFunction} from "connect";
import {ServerResponse} from "http";
import {Express} from "express";

export type NextHandleFunction = (req: IncomingMessage, res: ServerResponse, next: NextFunction) => void;


export const baseRoutes = (app: Express) => {
    app.get('/about', (request, response) => {
        response.json({ "Language": "Go", "Framework": "Gin", "Database": "Mongo", "Cloud": "AWS" });
    });
};