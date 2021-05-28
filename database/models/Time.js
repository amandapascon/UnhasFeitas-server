const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        required: true,
    },
})

mongoose.model('Time', UserSchema)