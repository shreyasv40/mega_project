const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const user = require("./models/user.js");



const sessionOption = {
  secret: "mysecretstring",
  resave: false,
  saveUninitialized: true,
}

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));
app.engine("ejs",ejsMate);



main()
.then(console.log("db to connection successful"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonder');
}

app.listen(port, () =>{
    console.log("app is listen on port 8080");
});




app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
passport.use(new LocalStrategy(user.authenticate()));
const a = 10;



app.use((req,res,next) =>{
  res.locals.success = req.flash("success");
  res.locals.fail = req.flash("fail");
  res.locals.currUser = req.user;
  next();
});

app.get("/", (req,res) =>{
    res.send("root route is working");
});


app.use("/listings",listingsRouter);
app.use("/listings/:id/review",reviewsRouter);
app.use("/",userRouter);

