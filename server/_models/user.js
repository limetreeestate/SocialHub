const mongoose = require("mongoose");

//Create schema for user colection
const UserSchema = new mongoose.Schema({
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