import express = require("express");
import {routes} from "./routes";
import bodyParser = require("body-parser");


const app = express();
const urlEncodedParser = bodyParser.urlencoded();

routes(app, urlEncodedParser);



app.listen(5000);
