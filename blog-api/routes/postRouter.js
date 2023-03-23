const express = require("express");
const commentRouter = require("./commentRouter");
const postControllers = require("../controllers/postControllers");
const passport = require("passport");

const router = express.Router();

router.get("/", postControllers.getPosts);
router.get("/:postid", postControllers.getPost);
router.post("/", passport.authenticate('jwt', { session: false }), postControllers.postPost);
router.put("/:postid", postControllers.putPost);
router.delete("/:postid", postControllers.deletePost);

router.use("/:postid/comments", commentRouter);

module.exports = router;
