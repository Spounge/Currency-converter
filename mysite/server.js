/*jslint node: true*/
"use strict";

const express = require("express");
const mustacheExpress = require("mustache-express");

const registerRoutes = require("./routes");


const app = express();

app.set("port", process.env.PORT || 8080);
app.engine("html", mustacheExpress());
app.set("view engine", "html");
app.set("views", __dirname + "/views");

registerRoutes(app);
app.listen(app.get("port"));
console.log("App started on port " + app.get("port") + ".");
