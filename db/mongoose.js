const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://Abdul Sabir:prsnl98=me@ds243049.mlab.com:43049/demo';
const url = MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(url);

module.exports = { mongoose };