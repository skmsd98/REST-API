const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Users } = require('./models/user');

const app = express();
app.use(bodyParser.json());


app.post('/users', (req, res) => {
    const newUser = new Users({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender
    });

    newUser.save().then((doc) => {
        res.status(200).send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});


app.get('/users', (req, res) => {
    Users.find().then((docs) => {
        res.status(200).send(docs);
    }, (err) => {
        res.status(400).send(err);
    });
});


app.listen(3000, () => {
    console.log("Server is up on port 3000");
});