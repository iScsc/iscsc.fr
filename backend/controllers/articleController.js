const { default: mongoose } = require("mongoose");
const Article = require("../models/article");

const getAll = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.send(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getByAuthor = async (req, res) => {
  let author;
  if (!req.params.author) {
    author = "alex";
  } else {
    author = req.params.author;
  }

  try {
    const articles = await Article.find({ author }).sort({ createdAt: -1 });
    res.send(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such article" });
  }
  const article = await Article.findById(id);

  if (!article) {
    res.status(400).json({ error: "No such article" });
  }

  res.status(200).json(article);
};

const create = async (req, res) => {
  const { title, body, summary } = req.body;
  const author = req.user["username"];
  try {
    const article = await Article.create({ title, author, body, summary });
    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteById = async (req, res) => {
  const id = req.params.id;
  const { username } = req.user;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such article" });
  }
  const author = await Article.findById(id).select("author");

  if (!author) {
    res.status(400).json({ error: "No such article" });
  } else if (author !== userid) {
    res.status(401).json({ error: "Access denied" });
  }

  const article = await Article.findByIdAndDelete(id);
  res.status(200).json(article);
};

module.exports = { getAll, getById, getByAuthor, create, deleteById };
