const a = 10;
const mongoose = require("mongoose");
const {Schema} = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user",userSchema);

