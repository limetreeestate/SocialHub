/*jshint esversion: 6 */
const express = require("express");
const support = require("./support");
const bodyParser = require("body-parser");
const Twitter = require("./twitter-premium-search");

const router = express.Router();
/* //Applicaation only config
const config = {
    consumer_key:   'um6jF7ckNjIYv1x1RDzK6Icmj',
    consumer_secret: 'T20pITV3BQalhkYHQhWnq8BKyepW5peqZG9s1IB7JvkfMEPfPb',
    app_only_auth: true
};
//Initialize application-only twitter
let twit = new Twit(config);
//Middleware to use json related features in the server
router.use(bodyParser.json());
//Twitter standard API search using Twit
router.post("/search", support.verifyUser, (request, response) => {
    delete request.verified;
    delete request.userID;
    delete request.headers.authorization;
    const req = request.body;
    console.log(req)
    //params that are passed as seperate fields
    const params = {
        q: req.q,
        count: 100,
        result_type: req.result_type,
        until: req.until
    };
    //Append filter params that are entered in the query
    const keys = Object.keys(req)
    keys.forEach(element => {
        const field = req[element]
        if (field === true) {
            params.q += " filter:" + element;
        }
    });
    console.log(params)
    twit.get('search/tweets', params, (err, data, res) => {
        response.send(data.statuses);
    });
}); */
//Middleware to use json related features in the server
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

let twitter = new Twitter();

router.post("/search", support.verifyUser, (request, response) => {
    delete request.userID;
    delete request.headers.authorization;
    twitter.search(request.body, (err, data, res) => {
        if (err){
            response.json(err);
        }
        else {
            response.json(JSON.parse(data.body).results);
        }
    });
});

router.get("/rate", (request, response) => {
    console.log("getting rate");
    twitter.getRateLimit((err, data, res) => {
        response.json(JSON.parse(data.body));
    });
});

module.exports = router; 
/**1934) Born to Be Bad [Bad Mikki]\
