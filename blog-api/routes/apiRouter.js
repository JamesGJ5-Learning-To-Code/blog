const express = require("express");
require("../controllers/passport");
const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const postRouter = require("./postRouter");
const commentRouter = require("./commentRouter");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/comments", commentRouter);

module.exports = router;
