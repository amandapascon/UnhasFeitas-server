const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    packs: {
        type: Array,
        required: false,
    },
    remainingHands: {
        type: Number,
        required: false,
    },
    remainingFeet: {
        type: Number,
        required: false,
    },
    role: {
        type: String,
        required: false
    }
})

mongoose.model('User', UserSchema)