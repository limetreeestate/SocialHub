/*jshint esversion: 6 */
const _request = require("request");

class Twitter {
    constructor() {
        this.baseURL = "https://api.twitter.com/1.1/tweets/search/30day/sclhb.json";
        this.config = {
            consumerKey: 'um6jF7ckNjIYv1x1RDzK6Icmj',
            consumerSecret: 'T20pITV3BQalhkYHQhWnq8BKyepW5peqZG9s1IB7JvkfMEPfPb',
            bearerToken: ""
        };
        this.init();
    }


    init() {
        //Application only authenticate
        const header = this.config.consumerKey + ":" + this.config.consumerSecret;
        const encryptedHeader = new Buffer(header).toString("base64");
        const form = { grant_type: "client_credentials" };
        const headers = { Authorization: `Basic ${encryptedHeader}` }
        //Send request for access token
        _request.post("https://api.twitter.com/oauth2/token", { form, headers }, (err, res, body) => {
            const temp = JSON.parse(body);
            if (err)
                console.log(err);
            else if (temp.token_type == "bearer") {
                this.config.bearerToken = JSON.parse(body).access_token;
            }
        });
    }

    search(params, callback) {
        let { query, fromDate, toDate} = params;
        console.log(params)
        //Add non direct filters to query string
        const keys = Object.keys(params);
        keys.forEach(element => {
            if (params[element] === true) {
                query += " " + element;
            }
        });
        if (params["lang:"] != "") {
            query += " lang:" + params["lang:"];
        }
        if (params["from:"] != "") {
            query += " from:" + params["from:"];
        }
        if (params["to:"] != "") {
            query += " to:" + params["to:"];
        }
        //Get URL
        let finalURL = `${this.baseURL}?query=${query}&maxResults=50`;
        //Append date params to the get url
        if (fromDate != null) {
            finalURL += "&fromDate=" + fromDate;
        }
        if (toDate != null) {
            finalURL += "&toDate=" + toDate;
        }
        //Encode URL
        finalURL = encodeURI(finalURL);
        //Header with bearer token
        console.log(finalURL)
        const headers = { Authorization: 'Bearer ' + this.config.bearerToken };
        //HTTP request to twitter premium search API
        _request.get(finalURL, {headers}, callback);
    }

    getRateLimit(callback) {
        //https://api.twitter.com/1.1/application/rate_limit_status.json
        const headers = { Authorization: 'Bearer ' + this.config.bearerToken };
        _request.get("https://api.twitter.com/1.1/application/rate_limit_status.json",{headers}, callback);
    }
}

module.exports = Twitter;