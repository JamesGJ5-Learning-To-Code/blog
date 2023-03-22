const express = require("express");
const commentControllers = require("../controllers/commentControllers");

const router = express.Router({mergeParams: true});

router.get("/", commentControllers.getComments);
router.post("/", commentControllers.postComment);
router.put("/:commentid", commentControllers.putComment);
router.delete("/:commentid", commentControllers.deleteComment);
// TODO: consider adding more routes

module.exports = router;
