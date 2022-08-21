const express = require('express');
const router = express.Router();
const Article = require('../models/article');

router.post('/create', (req, res) => {
    if (!req.body.author || !req.body.title || !req.body.body) {
        res.status(418).send("Missing author, title or body");
    }

    const article = new Article(req.body);
    article.save()
        .then((result) => {
            res.send(`Article '${result.title}' created successfully`);
        })
        .catch((err) => {
            console.log(err);
        })
});

router.get('/', (req, res) => {
    const articles = Article.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500).send("Cannot fetch articles.");
        })
});

module.exports = router;