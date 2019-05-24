/*jshint esversion: 6 */
const jwt = require("jsonwebtoken");
const _SECRET_KEY = "Secret key";

let support = {
    //Middleware for decoding JWT tokens
    verifyUser: (request, response, next) => {
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
    
        request.userID = payload.subject.user._id;
        next();
    }
}

module.exports = support;