const express = require("express");
const commentRouter = require("./commentRouter");
const postControllers = require("../controllers/postControllers");

const router = express.Router();

// NOTE: ensure that there are routes in commentRouter, otherwise a supplied path of 
// "comments" will be treated as a postid below
// TODO: make sure it's safe enough to use commentRouter as it is being used below, given 
// the postid confusion possibility

router.get("/", postControllers.getPosts);
router.get("/:postid", postControllers.getPost);
router.post("/", postControllers.postPost);
router.put("/:postid", postControllers.putPost);
router.delete("/:postid", postControllers.deletePost);
// TODO: consider adding more routes

router.use("/:postid/comments", commentRouter);

module.exports = router;
