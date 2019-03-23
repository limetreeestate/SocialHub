
/*jshint esversion: 6 */


const express = require("express");
const bodyParser = require("body-parser");
const api = require("./routes/api");
const cors = require("cors");

const app = express();

//For handling front-end and back-end port mismatch
app.use(cors());

//Use api.js to handle API calls
app.use("/api", api);


//Middleware to use json related features in the server
app.use(bodyParser.json());


//Server listens at port 8080
app.listen(8080, () => {
    console.log("Listening at port 8080");
});