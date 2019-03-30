const mongoose = require("mongoose");

//Create schema for user colection
const UserSchema = new mongoose.Schema({
    
    fName: String,
    lName: String,
    email: String,
    password: String,
    filterProfiles: {
        type: Array,
        default: []
    }
});

const User = mongoose.model("User", UserSchema);

//export user schema model
module.exports = User;