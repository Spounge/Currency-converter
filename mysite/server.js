/*jslint node: true*/
"use strict";

const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

const registerRoutes = require("./routes");


const app = express();

/* App settings */
app.set("port", process.env.PORT || 8080);
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

/* Middlewares */
app.use(bodyParser.urlencoded({extended: false}));

registerRoutes(app);

/* Lauch server */
app.listen(app.get("port"));
console.log("App started on port " + app.get("port") + ".");
