const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    services: {
        type: String,
        required: true,
    }
})

mongoose.model('Scheduling', UserSchema)