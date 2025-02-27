const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minLength : 8
    },
    worth : {
        type : Number,
        required : true,
        default : 0
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;