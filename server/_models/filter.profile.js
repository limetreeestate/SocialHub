const mongoose = require("mongoose");

//Create schema for user filter profile
const FilterProfileSchema = new mongoose.Schema({
    typeOfPost: {
        type: String,
        enum: ['Text', 'Image', 'Video']
    },
    isPersonalAccount: boolean,
    isVerified: boolean
});

const FilterProfile = mongoose.model("FilterProfile", FilterProfileSchema);

module.exports = FilterProfile;