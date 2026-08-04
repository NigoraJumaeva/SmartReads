const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
{
    userName: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    favourites: {
        type: Array,
        default: []
    }
},
{
    timestamps: true
});


module.exports = mongoose.model("User", UserSchema);