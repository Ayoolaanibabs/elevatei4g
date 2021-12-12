const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        select: false
    },
    phone: {
        type: String,
        default: ""
    },

    address: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})


module.exports = mongoose.model('company', companySchema);
