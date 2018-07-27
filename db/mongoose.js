const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://<dbuser>:<dbpassword>@ds243049.mlab.com:43049/demo';
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/Users';

mongoose.Promise = global.Promise;
mongoose.connect(url);

module.exports = { mongoose };