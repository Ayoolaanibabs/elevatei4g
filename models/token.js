const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    token: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        expires: '1d'
    },

    used: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('token', tokenSchema);
