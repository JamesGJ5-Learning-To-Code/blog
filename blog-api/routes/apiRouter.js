const express = require("express");
require("../controllers/passport");
const authRouter = require("./authRouter");
const postRouter = require("./postRouter");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/posts", postRouter);

module.exports = router;
