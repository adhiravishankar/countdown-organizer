import {Express} from "express";
import {NextHandleFunction} from "./base";

export const manufacturerRoutes = (app: Express, urlEncodedParser: NextHandleFunction) => {

    app.get('/manufacturers', (request, response) => {
        response.send('Hello world!');
    });

    app.post('/manufacturers', (request, response) => {
        response.send('Hello world!');
    });

    app.delete('/manufacturers/:manufacturer', (request, response) => {
        response.json({ "Language": "Go", "Framework": "Gin", "Database": "Mongo", "Cloud": "AWS" });
    });
};