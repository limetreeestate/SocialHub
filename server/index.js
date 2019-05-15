
/*jshint esversion: 6 */


const express = require("express");
const bodyParser = require("body-parser");
const api = require("./routes/api");
const cors = require("cors");
const fs = require('fs');
let https = require("https");

const app = express();
//SSL Certificate and key
const key = fs.readFileSync("./ssl/server.key");
const cert = fs.readFileSync("./ssl/server.crt");
const options = {key, cert};

//For handling front-end and back-end port mismatch
app.use(cors());

//Use api.js to handle API calls
app.use("/api", api);


//Middleware to use json related features in the server
app.use(bodyParser.json());

app.get("", (req, res) => {
    console.log("Hello");
});

//HTTPS Server listens at port 8080
https.createServer(options, app).listen(8080, () => {
    console.log("Listening at port 8080");
});