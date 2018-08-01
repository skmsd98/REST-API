const express = require('express');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");

const { mongoose } = require('./db/mongoose');
const { Users } = require('./models/user');
const { ObjectID } = require('mongodb');


/////////////////////////////////////////////////////////
const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());


app.post('/users', (req, res) => {
    const newUser = new Users({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender
    });

    newUser.save().then(() => {
        return newUser.generateAuthToken();
    }).then(token => {
        res.header('x-auth', token).status(200).send(newUser);
    }).catch(err => {
        res.status(400).send(err);
    });
});

app.post('/users/me', (req, res) => {
    const token = req.header('x-auth');

    Users.findByToken(token).then(user => {
        if(!user) {
            return Promise.reject();
        }

        res.status(200).send(user);
    }).catch(err => {
        res.status(401).send();
    })

})

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
        };
        res.status(200).send(doc);
    }, err => {
        res.status(400).send(err);
    });
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)) {
        res.status(404).send();
    };

    Users.findByIdAndRemove(id).then(doc => {
        if(!doc) {
            res.status(404).send();
        };
        res.status(200).send(doc);
    }, err => {
        res.status(400).send(err);
    });
});

app.patch('/users/:id', (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)) {
        res.status(404).send();
    };
    const { name, age, gender } = req.body;
    Users.findByIdAndUpdate(id, { $set: { name, age, gender } }, { new: true }).then(doc => {
        if(!doc) {
            res.status(404).send();
        };
        res.status(200).send(doc);
    }, err => {
        res.status(400).send(err);
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});