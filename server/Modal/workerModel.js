const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    currpassword:{
        type:String,
    },
    phone: {
        type: Number,
    },
    profileImg: {
        URL: String,
    },
    rating: {
        type: mongoose.Types.ObjectId,
        ref: 'Rating',
    },
    address: {
        type: mongoose.Types.ObjectId,
        ref: 'Address',
    },
    active: {
        type: Boolean,
        default: true
    },
    authToken: {
        type: String,
    },
    workingHours: {
        type: String,
    },

}, { timestamps: true });

module.exports = new mongoose.model("Worker", workerSchema);