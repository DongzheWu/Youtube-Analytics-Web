const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    googleId: String,
    trackList: [String],
    dateList: [Date],
});

mongoose.model('users', UserSchema);