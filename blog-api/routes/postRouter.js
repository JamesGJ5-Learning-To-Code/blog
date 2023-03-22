const express = require("express");
const postControllers = require("../controllers/postControllers");

const router = express.Router();

router.get("/", postControllers.getPosts);
router.get("/:postid", postControllers.getPost);
router.post("/", postControllers.postPost);
router.put("/:postid", postControllers.putPost);
router.delete("/:postid", postControllers.deletePost);
// TODO: consider adding more routes

module.exports = router;
