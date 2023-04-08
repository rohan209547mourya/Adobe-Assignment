const mongoose = require("mongoose");
const Joi = require('joi')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024,
    },
    bio: {
        type: String,
        maxlength: 200,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user',
    },
    profileImage:{
        type: String,
    }
});


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, name: this.name, role: this.role }, process.env.JWT_SECERT || "temp_key")
    return token
}


const validateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(16).required(),
        bio: Joi.string().max(200),
    });
    return schema.validate(user);
}


const User = mongoose.model('User', userSchema);
module.exports = {
    User,
    validateUser
};