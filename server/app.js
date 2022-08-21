const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const { createServer } = require('http');
require('dotenv/config');

// models
const Article = require('./models/article');
const User = require('./models/user');

const httpServer = createServer(app);

const {
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    PORT
} = process.env;

app.get('/', (req, res) => {
    res.send('iscsc.fr is running');
});

app.post('/signup', (req, res) => {
    console.log(req.body);
    const { username, password, email } = req.body;
    if (!username || !password) {
        res.send(418);
    }

    const user = new User({
        username,
        hashedPassword: password,  // TODO: hash password
        email
    });
    user.save()
        .then((result) => {
            res.send(`User ${result.username} successfully created`);
        })
        .catch((err) => {
            console.log(err);
        })
});

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@iscsc.a11re32.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)
    .then(() => {
        httpServer.listen(PORT || 5000, () => {
            console.log(`Server listening: http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });