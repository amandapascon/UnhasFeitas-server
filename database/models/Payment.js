const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    pack: {
        type: String,
        required: true,
    }
})

mongoose.model('Payment', UserSchema)