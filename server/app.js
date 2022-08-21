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
        res.status(418).send("Missing username or password");
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

app.get('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(418).send("Missing username or password");
    }

    // Get hashedPassword
    User.findOne({ username }, (err, result) => {
        if (result) {
            const { hashedPassword } = result;

            // compare
            bcrypt.compare(password, hashedPassword, function (err, result) {
                if (result) {
                    res.send(`Logged as ${username} successfully`);
                }
                else {
                    res.status(418).send(`Access denied: Invalid password for ${username}`);
                }
            })
        }
        else {
            res.status(418).send(`User ${username} not found`);
        }
    })
})

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