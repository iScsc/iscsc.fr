const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { createServer } = require('http');
const Article = require('./models/article');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const httpServer = createServer(app);
require('dotenv/config');

app.use(express.json());

const {
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    PORT,
    SALT_ROUND
} = process.env;

app.get('/', (req, res) => {
    res.send('iscsc.fr is running');
});

app.post('/signup', (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password) {
        res.send(418);
    }

    bcrypt.genSalt(SALT_ROUND, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            const user = new User({
                username,
                hashedPassword: hash,
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
    });
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