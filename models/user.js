const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    ageRange: {
        type: [Number],
        required: false
    },
    isAnonymous: {
        type: Boolean,
        required: true,
        default: false
    },
    lastOTP: {
        type: Number,
        required: false
    },
},
{
  timestamps : true
});

module.exports = mongoose.model('User', user);