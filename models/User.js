"use strict";
const mongoose = require('mongoose');
const TrackSchema = require('./Track');
const { Schema } = mongoose;

//Store user information.
const UserSchema = new Schema({
    googleId: String,
    email: String,
    displayName: String,
    createDate: Date,
    tracks: [TrackSchema],
    vip: { type: Number, default: 0},
});

mongoose.model('users', UserSchema);