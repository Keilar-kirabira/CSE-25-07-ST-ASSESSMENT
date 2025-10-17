const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const signupSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true // adds createdAt and updatedAt fields
});

signupSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});
module.exports = mongoose.model('UserModel',signupSchema)