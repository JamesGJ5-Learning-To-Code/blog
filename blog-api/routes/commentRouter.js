// NOTE: if there are no routes in the router defined below, then in ../postRouter, if the 
// path supplied is "comments", this may be treated as a postid

const express = require("express");
const commentControllers = require("../controllers/commentControllers");

const router = express.Router();

router.get("/", commentControllers.getComments);
router.post("/", commentControllers.postComment);
router.put("/:postid", commentControllers.putComment);
router.delete("/:postid", commentControllers.deleteComment);
// TODO: consider adding more routes

module.exports = router;
