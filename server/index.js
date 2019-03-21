const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./_models/user.js");
const crypto = require("crypto");
const session = require("express-session");

const app = express();

//Switch from callbacks to promises
mongoose.Promise = Promise;

//Create database connection for client
mongoose.connect("mongodb://client:client123@localhost:27017/socialhub")
    .then(() => console.log("Mongoose connection established"));

//Middleware to use json related features in the server
app.use(bodyParser.json());

//Use session
app.use(session({
    secret: "ASDASDASD",
    saveUninitialized: false,
    resave: false
}));

//Handle POST registration request
app.post("/api/register", async (request, response) => {
    let { fName, lName, email, password } = request.body;

    //Create md5 hash
    const md5Hash = crypto.createHash("md5")

    //Hash password
    password = md5Hash.update(password).digest("hex");

    const user = new User({
        fName,
        lName,
        email,
        password
    });

    console.log(fName);

    //Check if user exists
    let isExistingUser = await User.findOne({
        "email": email,
        "password": password
    });


    if (isExistingUser) {

        response.json({
            'success': false,
            'message': "User already exists!",
        });
        return;
    }
    
    console.log(result);
    //create new user in db using email and password
    //Await till respones comes
    const result = await user.save();

    if (!result) {

        console.log("Error in registration");
        response.json({
            'success': false,
            'message': "Error in registration",
        });

    } else {
        //return sucess response
        response.json({
            "success": true,
            "message": "User verified",
        });
    }

});


//Handle POST login request
app.post("/api/login", async (request, response) => {
    let { email, password } = request.body;

    //Create md5 hash
    const md5Hash = crypto.createHash("md5")

    //Hash password
    password = md5Hash.update(password).digest("hex");


    //find user from db matching the email and password
    //Await till respones comes
    const user = await User.findOne({
        "email": email,
        "password": password,
    });

    if (!user) {

        console.log("Invalid credentials");
        response.json({
            'success': false,
            'message': "Invalid credentials",
            'user': null
        })

    } else {
        //Create and save session for user
        //request.session.user = {lName, email};
        //request.session.save();
        
        //return user
        response.json({
            "success": true,
            "message": "User verified",
            "user": user
        });
    }


});

//Get session data
app.get("/api/data", async (request, response) => {
    response.json({
        name: request.session.user.lName,
        email: request.session.user.email,
    })
});


//Server listens at port 8080
app.listen(8080, () => {
    console.log("Listening at port 8080");
});