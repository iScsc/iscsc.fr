const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { createServer } = require('http');
const userRoutes = require('./routes/users');
const articleRoutes = require('./routes/articles');
const httpServer = createServer(app);
require('dotenv/config');

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);

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