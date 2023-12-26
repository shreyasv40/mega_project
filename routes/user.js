const express = require("express");
const router = express.Router({ mergeParams: true });
const user = require("../models/user.js");
const passport = require("passport");
const { saveUrl, isLogedIn } = require("../middleware.js");
const userController = require("../controller/user.js");



router.get("/signup", userController.signupForm);

router.post("/signup", userController.saveSignup);

router.get("/login", userController.loginForm);

router.post('/login', saveUrl,
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),userController.saveLogin);


router.get("/logout", userController.logout);
module.exports = router;