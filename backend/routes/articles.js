const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

router.get('/', articleController.getAll);
router.get('/byAuthor', articleController.getByAuthor);
router.get('/byAuthor/:author', articleController.getByAuthor);
router.post('/create', articleController.create);
router.get('/:id', articleController.getById);
router.delete('/:id', articleController.deleteById);

module.exports = router;