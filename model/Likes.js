const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
    liker: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    liked: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    likerliked: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Likes', likesSchema);