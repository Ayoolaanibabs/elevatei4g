const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company",
        required: true
    },
    fullName: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
        default: ""
    },

    address: {
        type: String,
    },
    gender: {
        type: String,
    },
    monoId: {
		type: String,
		default: ''
	},
	monoCode: {
		type: String,
		default: ''
	},
	monoStatus: {
		type: Boolean,
		default: false
	},
}, {
    timestamps: true
})


module.exports = mongoose.model('user', userSchema);
