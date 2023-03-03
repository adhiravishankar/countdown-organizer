
import {routes} from "./routes";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from "morgan";
import express from "express";
import bodyParser from "body-parser";

dotenv.config();

const mongoString = process.env.MONGODB_URL
await mongoose.connect(mongoString);
const database = mongoose.connection
console.log(database);
const app = express();
app.use(morgan('dev'))

const urlEncodedParser = bodyParser.urlencoded();

routes(app, urlEncodedParser);



app.listen(5000, () => console.log('Listening on port 5000'));
