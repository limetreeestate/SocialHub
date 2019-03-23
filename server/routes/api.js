/*jshint esversion: 6 */

const express = require("express");
const mongoose = require("mongoose");
const User = require("../_models/user.js");
const crypto = require("crypto");
const bodyParser = require("body-parser");

const router = express.Router()

//Middleware to use json related features in the server
router.use(bodyParser.json());

//Switch from callbacks to promises
mongoose.Promise = Promise;

//Create database connection for client
mongoose.connect("mongodb://client:client123@localhost:27017/socialhub")
.then(() => console.log("Mongoose connection established"));


router.get("/", (req, res) => {
    res.send("From API route");
});



//Handle POST registration request
router.post("/register", async (request, response) => {
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
    let isExistingUser = await User.findOne({email});


    if (isExistingUser) {
        response.status(401).send("Error in registration");
    }
    
    //create new user in db using email and password
    //Await till respones comes
    user.save((err, res) => {
        if (err) {
            response.status(401).send("Error in registration")
        } else {
            response.status(200).json({
                'success': true,
                'message': "Successful reegistration",
            });
        }
    });

});


//Handle POST login request
router.post("/login", (request, response) => {
    console.log(request.body)
    let { email, password } = request.body;

    //Create md5 hash
    const md5Hash = crypto.createHash("md5")

    //Hash password
    password = md5Hash.update(password).digest("hex");


    //find user from db matching the email and password
    User.findOne({email, password}, (err, user) => {
        console.log(err, user)
        if (err) {
            response.status(401).send(err)
        } else {
            if (!user) {
                response.status(401).send("Invalid credentials")
            } else {
                response.status(200).json({
                    "success": true,
                    "message": "User verified",
                    "user": user
                })
            }
        }
    }
        
    );


});






module.exports = router;