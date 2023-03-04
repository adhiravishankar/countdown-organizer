
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from "morgan";
import express from "express";
import bodyParser from "body-parser";
import {baseRoutes} from "./routes/base";
import {cologneRoutes} from "./routes/colognes";
import {manufacturerRoutes} from "./routes/manufacturers";

dotenv.config();

const mongoString = process.env.MONGODB_URL
await mongoose.connect(mongoString);



const app = express();
app.use(morgan('dev'))

const urlEncodedParser = bodyParser.urlencoded();

baseRoutes(app);
cologneRoutes(app, urlEncodedParser);
manufacturerRoutes(app, urlEncodedParser);


app.listen(5000, () => console.log('Listening on port 5000'));
