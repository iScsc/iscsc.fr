const Article = require('../models/article');

const getAll = (req, res) => {
    Article.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500).send("Cannot fetch articles.");
        })
}

const getById = (req, res) => {
    const id = req.params.id;
    const articles = Article.findOne({ id })
        .then((result) => {
            if (!result) {
                res.status(418).send(`Article ${id} not found`);
            } else {
                res.send(result);
            }
        })
        .catch((err) => {
            res.status(500).send(`Cannot fetch article ${id}`);
        })
}

const create = (req, res) => {
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
}

const deleteById = (req, res) => {
    const id = req.params.id;
    const articles = Article.findByIdAndDelete(id)
        .then((result) => {
            res.send(`Article "${result.title}" deleted`);
        })
        .catch((err) => {
            res.status(500).send(`Cannot fetch article ${id}`);
        })
}

module.exports = { getAll, getById, create, deleteById };