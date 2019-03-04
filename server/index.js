const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./_models/user.js");
const crypto = require("crypto");

const app = express();

//Switch from callbacks to promises
mongoose.Promise = Promise;

//Create database connection for client
mongoose.connect("mongodb://client:client123@localhost:27017/socialhub")
    .then(() => console.log("Mongoose connectino established"));

//Middleware to use json related features in the server
app.use(bodyParser.json());


//Handle POST registration request
app.post("/api/register", async (request, response) => {
    let {email,  password} = request.body;
    
    //Create md5 hash
    const md5Hash = crypto.createHash("md5")

    //Hash password
    password = md5Hash.update(password).digest("hex");
    
    const user = new User({
        email,
        password
    });
    
    //create new user in db using email and password
    //Await till respones comes
    const result = await user.save();
    
    console.log(result);
    response.json(result);
    
});


//Handle POST login request
app.post("/api/login", async (request, response) => {
    let {email,  password} = request.body;
    
    //Create md5 hash
    const md5Hash = crypto.createHash("md5")

    //Hash password
    password = md5Hash.update(password).digest("hex");
    
    
    //find user from db matching the email and password
    //Await till respones comes
    const user = await User.findOne({email, password});
    
    if(!user){
        console.log("Invalid credentials");
    } else {
        console.log("User verified");
    }
    
    //return user
    response.send(user);
    
});


//Server listens at port 8080
app.listen(8080, () => {
    console.log("Listening at port 8080");
});