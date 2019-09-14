/*jslint node: true*/
"use strict";

const express = require("express");
const exphbs = require("express-handlebars");

const registerRoutes = require("./routes");


const app = express();

/* constant */
app.set("port", process.env.PORT || 8080);
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

/* middlewares */
app.use(express.urlencoded());

registerRoutes(app);

/* runserver */
app.listen(app.get("port"));
console.log("App started on port " + app.get("port") + ".");
