const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Users } = require('./models/user');
const { ObjectID } = require('mongodb');

const port = process.env.PORT || 3000;

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


app.get('/users/:id', (req, res) => {
    const id = req.params.id;

    if(!ObjectID.isValid(id)) {
        res.status(404).send();
    };

    Users.findById(id).then(doc => {
        if(!doc) {
            res.status(404).send();
        }
        res.status(200).send(doc);
    }, err => {
        res.status(400).send();
    });
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});