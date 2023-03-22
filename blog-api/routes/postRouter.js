const express = require("express");
const commentRouter = require("./commentRouter");
const postControllers = require("../controllers/postControllers");

const router = express.Router();

// NOTE: ensure that there are routes in commentRouter, otherwise a supplied path of 
// "comments" will be treated as a postid below
router.use("/comments", commentRouter);

router.get("/", postControllers.getPosts);
router.get("/:postid", postControllers.getPost);
router.post("/", postControllers.postPost);
router.put("/:postid", postControllers.putPost);
router.delete("/:postid", postControllers.deletePost);
// TODO: consider adding more routes

module.exports = router;
