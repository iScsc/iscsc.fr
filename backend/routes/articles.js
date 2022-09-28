const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const requireAuth = require("../middleware/requireAuth");

router.get("/", articleController.getAll);
router.get("/by-author", articleController.getByAuthor);
router.get("/by-author/:author", articleController.getByAuthor);
router.post("/create", requireAuth, articleController.create);
router.get("/:id", articleController.getById);
router.delete("/:id", requireAuth, articleController.deleteById);

module.exports = router;
