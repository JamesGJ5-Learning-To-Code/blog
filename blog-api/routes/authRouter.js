const express = require("express");
const authenticationControllers = require("../controllers/authenticationControllers");

const router = express.Router();

// NOTE: if using Postman to make this request, put the "username" and "password" into the 
// Body (x-www-form-urlencoded) as keys, with the actual username and password as their 
// respective values
router.post("/login", authenticationControllers.loginPost)

module.exports = router;
