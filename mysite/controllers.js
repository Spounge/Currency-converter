/*jslint node: true*/
"use strict";

exports.home = function (_req, res) {
    console.log("Home page");
    res.render("index");
};

exports.convert = function (_req, res) {
    console.log("Convert");
    res.render("result");
};
