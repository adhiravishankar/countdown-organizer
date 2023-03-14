
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from "morgan";
import express from "express";
import cors from "cors";
import {routes} from "./routes";

import AWS from "@aws-sdk/client-s3";
import multer from "multer";
import url from "url";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

dotenv.config({ path: __dirname + './../app.env' });

const mongoString = process.env.MONGODB_URL
await mongoose.connect(mongoString);

const app = express();
app.use(morgan('dev'))
app.use(cors())

const upload = multer({ storage: multer.memoryStorage() })
const s3 = new AWS.S3({ region: process.env.AWS_REGION });
routes(app, s3, upload);

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}!`));
