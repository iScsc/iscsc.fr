const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { createServer } = require('http');
require('dotenv/config');

const httpServer = createServer(app); 

const {
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  PORT
} = process.env;
const dbURI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@iscsc.a11re32.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

app.get('/', (req, res) => {
    res.send('iscsc.fr is running');
});

mongoose
    .connect(dbURI)
    .then(() => {
        httpServer.listen(PORT || 5000, () => {
            console.log('Server listening');
        });
    })
    .catch((err) => {
        console.log(err);
    });