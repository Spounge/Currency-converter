/*jslint node: true*/
"use strict";

module.exports = function (app) {
    /* Register routes */

    const currencyConverter = require("./controllers");

    app.route("/").get(currencyConverter.home);
    app.route("/").post(currencyConverter.result);
    app.route("/service").get(currencyConverter.service);
};
