// db/models/Users.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Username: {
        type: String,
        requires: true,
        unique: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Encrypted_Password: {
        type: String,
        required: true,
    },
    Friends: [{
        type: String,
        ref: 'User',
    }],
    Active_Listings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Listings',
    }],
});

module.exports = mongoose.model('User', UserSchema);