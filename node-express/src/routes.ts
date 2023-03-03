import {Express} from "express";
import {IncomingMessage, NextFunction} from "connect";
import {ServerResponse} from "http";

export type NextHandleFunction = (req: IncomingMessage, res: ServerResponse, next: NextFunction) => void;


export const routes = (app: Express, urlEncodedParser: NextHandleFunction) => {

    app.get('/', (request, response) => {
        response.send('Hello world!');
    });

}
