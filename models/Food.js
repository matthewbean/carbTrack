const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    carbs: {
        type: String,
        required: true
    },
    fat: {
        type: String,
        required: true
    },
    date: {
        type: String,
    }
})

module.exports = mongoose.model('food', ContactSchema)