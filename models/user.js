const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
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
    },

    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.statics.findByToken = function(token) {
    var decoded;
    try {
        decoded = jwt.verify(token, 'mysecret');
    }
    catch(e) {
        return Promise.reject();
    }

    return this.findOne({
        "_id": decoded._id,
        "tokens.access": "auth",
        "tokens.token": token
    });
}

UserSchema.methods.toJSON = function() {
    return _.pick(this, ['_id','name', 'age', 'gender']);
};

UserSchema.methods.generateAuthToken = function() {
    const access = 'auth';
    const token = jwt.sign({_id: this._id.toHexString(), access}, 'mysecret').toString();

    this.tokens.push({access, token});
    return this.save().then(() => {
        return token;
    });
};

const Users = mongoose.model('Users', UserSchema)

module.exports = { Users };