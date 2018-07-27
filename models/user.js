const mongoose = require('mongoose');

const Users = mongoose.model('Users', {
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },

    age: {
        type: Number,
        required: true,
        trim: true,
        minlength: 1
    },
    
    gender: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
})

module.exports = { Users };