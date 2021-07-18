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
    pack:{
        type: String,
        required: false,
        default: null,
    },
    usageHistory: {
        type: Array,
        required: false,
    },
    dateHistory:{
        type: Array,
        required: false,
    },
    remainingPack: {
        type: Number,
        required: false,
    },
    role: {
        type: String,
        required: false,
    }
})

mongoose.model('User', UserSchema)