const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

router.post('/create', articleController.create);
router.get('/', articleController.getAll);
router.get('/:id', articleController.getById);
router.delete('/:id', articleController.deleteById);

module.exports = router;