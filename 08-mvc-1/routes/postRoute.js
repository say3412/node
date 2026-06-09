const express = require("express");
const router = express.Router();
const postController = require("../controllers/postCotroller");

router.post("/", postController.create);
router.get("/", postController.list);
router.get("/:id", postController.get);
router.put("/:id", postController.update);
router.delete("/:id", postController.remove);

module.exports = router;