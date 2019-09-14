/*jslint node: true*/
"use strict";

const request = require("request");

const apiUrl = "https://api.exchangeratesapi.io/latest?";

exports.home = function (req, res) {
    /* Request list of currency provided by api, render homepage and
        print error if necessary */

    var url = apiUrl;
    var obj = {};
    var currencies = {};

    request(url, function (_err, _reqres, body) {
        if (!res) {
            req.query.error = "Can't reach api.";
        } else {
            obj = JSON.parse(body);
            currencies = Object.keys(obj.rates);
            currencies.unshift(obj.base);
        }
        return res.render("index", {
            "currencies": currencies,
            "error": req.query.error
        });
    });
};

exports.result = function (req, res) {
    /* Converts input datas, redirect to homepage if error. */

    var base = {};
    var converted = {};
    var url = "";
    var urlBase = "";
    var urlSymbols = "";

    base.amount = parseFloat(req.body.amount);
    base.currency = req.body.baseCurrency;
    converted.amount = 0.0;
    converted.currency = req.body.targetCurrency;
    urlBase = "base=" + base.currency;
    urlSymbols = "symbols=" + converted.currency;
    url = apiUrl + urlBase + "&" + urlSymbols;

    request(url, function (_err, _reqres, body) {
        var obj = {};
        var rate = 0;
        var amount = 0;

        if (!res) {
            return res.redirect("/?error=Can't reach api");
        }
        obj = JSON.parse(body);
        if (obj.error && !base.currency === converted.currency) {
            var error = obj.error;
            return res.redirect("/?error=" + error);
        }
        rate = (base.currency === converted.currency) ?
                1 : parseFloat(obj.rates[converted.currency]);
        amount = Math.round(base.amount * rate * 100) / 100;
        converted.amount = amount.toString();
        res.render("result", {
            base: base,
            converted: converted
        });
    });
};


exports.service = function (req, res) {
    /* Handle requests to the service */

    var output = {};
    var input = req.query;

    if (input.base_currency && input.value && input.quote_currency) {
        var urlBase = "base=" + input.base_currency;
        var urlSymbols = "symbols=" + input.quote_currency;
        var url = apiUrl + urlBase + "&" + urlSymbols;

        request(url, function (_err, _reqres, body) {
            var obj = {};
            var rate = 0;

            if (!res) {
                output.error = "Invalid request";
                res.statusCode = 400;
                return res.json(output);
            }
            obj = JSON.parse(body);
            if (obj.error && !input.base_currency === input.quote_currency) {
                output.error = obj.error;
                res.statusCode = 503;
            } else {
                rate = (input.base_currency === input.quote_currency) ?
                    1 : parseFloat(obj.rates[input.quote_currency]);
                output.value = input.value * rate;
                res.statusCode = 200;
            }
            res.json(output);
        });
    } else {
        output.error = "Invalid request";
        res.statusCode = 400;
        res.json(output);
    }
};
