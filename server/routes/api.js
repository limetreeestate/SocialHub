/*jshint esversion: 6 */

const express = require("express");
const mongoose = require("mongoose");
const User = require("../_models/user.js");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const router = express.Router()

const _SECRET_KEY = "Secret key";

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
    let userData = request.body;

    //Create md5 hash
    const md5Hash = crypto.createHash("md5")

    //Hash password
    userData.password = md5Hash.update(userData.password).digest("hex");

    const user = new User(userData);

    //Check if user exists
    const email = userData.email;
    let isExistingUser = await User.findOne({email});


    if (isExistingUser) {
        response.status(401).send("Error in registration");
    }
    
    //create new user in db using email and password
    //Await till respones comes
    user.save((err, res) => {
        if (err) {
            response.status(401).send("Error in registration");
        } else {
            response.status(200).json({
                'success': true,
                'message': "Successful registration",
            });
        }
    });

});


//Handle POST login request
router.post("/login", (request, response) => {
    let { email, password } = request.body;
    console.log(`User ${email} attempted login`)

    //Create md5 hash
    const md5Hash = crypto.createHash("md5")

    //Hash password
    password = md5Hash.update(password).digest("hex");


    //find user from db matching the email and password
    User.findOne({email, password}, (err, user) => {
        if (err) {
            console.log(err)
            response.status(401).send(err)
        } else {
            if (!user) {
                console.log(`Invalid login attempt by user ${email}`)
                response.status(401).send("Invalid credentials")
            } else {
                let payload = {
                    subject : {
                        "success": true,
                        "message": "User verified",
                        "user": user
                    }
                };
                
                let token = jwt.sign(payload, _SECRET_KEY);
                console.log(`Successful user ${email} login`)
                response.status(200).send({token})
            }
        }
    }
        
    );


});

//Middleware for decoding JWT tokens
function verifyUser(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return response.status(401).send("Unauthorzied request")
    }

    let token = authHeader.split(" ")[1];
    if (token === "null") {
        return response.status(401).send("No token")
    }

    let payload = jwt.verify(token, _SECRET_KEY)
    if (!payload) {
        return response.status(401).send("Invliad token") 
    }

    request.userID = payload.subject.user._id
    next()
}

//Verify user based on JWT token
router.post("/verify", verifyUser, (request, response) => {
    const {fields, userID} = request.body
    const project = {}
    
    fields.forEach(element => project[element] = 1);

    User.findOne({userID}, project, (err, res) => {
        if (!err) response.status(200).json(res);
        else response.status(401).json(err);
    });
});




module.exports = router;