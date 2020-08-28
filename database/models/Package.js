const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    handDuration: {
        type: Number,
        required: true,
    },

    feetDuration: {
        type: Number,
        required: true,
    }
})

mongoose.model('Package', UserSchema)