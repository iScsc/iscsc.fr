const express = require('express');
const router = express.Router();
const articleControler = require('../controllers/articleController');

router.post('/create', articleControler.create);
router.get('/', articleControler.getAll);
router.get('/:id', articleControler.get);

module.exports = router;