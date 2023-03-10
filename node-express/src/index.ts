
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from "morgan";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {routes} from "./routes";

dotenv.config();

const mongoString = process.env.MONGODB_URL
await mongoose.connect(mongoString);

const app = express();
app.use(morgan('dev'))
app.use(cors())

const urlEncodedParser = bodyParser.urlencoded();
routes(app, urlEncodedParser);

app.listen(5000, () => console.log('Listening on port 5000'));
