const user = require("../models/user.js");

module.exports.signupForm = (req, res) => {
    res.render("./user/signup.ejs");
  }

module.exports.saveSignup = async (req, res, next) => {
    try {
      let { email, username, password } = req.body;
      let newuser = new user({ email, username });
      const register = await user.register(newuser, password);
  
      req.login(register, (err) => {
        if (err) {
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
  
  }

  module.exports.loginForm = (req, res) => {
    res.render("./user/login.ejs");
  
  }

  module.exports.saveLogin =  (req, res) => {
    let url = res.locals.redirect || "/listings";
    res.redirect(url);
  }

  module.exports.logout = (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next();
      }
      req.flash("success", "you are log out");
      res.redirect("/listings");
    });
  }