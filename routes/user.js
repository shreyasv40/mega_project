const express = require("express");
const router = express.Router({ mergeParams: true });
const user = require("../models/user.js");
const passport = require("passport");



router.get("/signup", (req, res) => {
  res.render("./user/signup.ejs");
}); 

router.post("/signup", async (req, res, next) => {
  try {
    let { email, username, password } = req.body;
    let newuser = new user({ email, username });
    const register = await user.register(newuser, password);

    req.login(register, (err) => {
     if(err) {
      next(err);
     }
     req.flash("success", "You are signup");
     res.redirect("/listings");
    });
  }
  catch (err) {
  req.flash("fail", "User are already exist");
  res.redirect("/signup");
}
  
});

router.get("/login", (req, res) => {
  res.render("./user/login.ejs");
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  (req, res) => {
    res.redirect('/listings');
  });

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next();
    }
    req.flash("success", "you are log out");
    res.redirect("/listings");
  });
})
module.exports = router;