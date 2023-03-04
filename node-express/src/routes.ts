import {Express} from "express";
import {CologneModel} from "./Cologne";
import {IncomingMessage, NextFunction} from "connect";
import {ServerResponse} from "http";

export type NextHandleFunction = (req: IncomingMessage, res: ServerResponse, next: NextFunction) => void;

export const routes = (app: Express, urlEncodedParser: NextHandleFunction) => {

    app.get('/about', (request, response) => {
        response.json({ "Language": "Go", "Framework": "Gin", "Database": "Mongo", "Cloud": "AWS" });
    });

    app.get('/colognes', (request, response) => {
        const colognes = CologneModel.find();
        response.json(colognes);
    });

    app.post('/colognes', urlEncodedParser, (request, response) => {
        response.send('Hello world!');
    });

    app.get('/colognes/:cologne', (request, response) => {
        const cologneID: string = request.params.cologne as string;
        const cologne = CologneModel.findById(cologneID);
        response.json(cologne);
    });

    app.patch('/colognes/:cologne',urlEncodedParser, (request, response) => {
        response.json({ "Language": "Go", "Framework": "Gin", "Database": "Mongo", "Cloud": "AWS" });
    });

    app.delete('/colognes/:cologne', (request, response) => {
        const cologneID: string = request.params.cologne as string;
        const success = CologneModel.findByIdAndDelete(cologneID);
        response.json(success);
    });

    app.post('/attributes', urlEncodedParser, (request, response) => {
        response.json({ "Language": "Go", "Framework": "Gin", "Database": "Mongo", "Cloud": "AWS" });
    });

    app.delete('/attributes/:attribute', (request, response) => {
        const attributeID: string = request.params.attribute as string;
        const success = CologneModel.findByIdAndDelete(attributeID);
        response.json(success);
    });
};