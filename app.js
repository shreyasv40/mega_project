if(process.env.NODE_ENV != "production"){
  require("dotenv").config();
}
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const user = require("./models/user.js");
const {saveUrl} = require("./middleware.js");
const listing = require("./models/listing.js");
const dbUrl = process.env.ATLASDB_URL;


const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error",() =>{
  console.log("Error in mongo session",err);
})

const sessionOption = {
  store: store,
  secret: process.env.SECRET,
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
  await mongoose.connect(dbUrl);
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






app.use((req,res,next) =>{
  res.locals.success = req.flash("success");
  res.locals.fail = req.flash("fail");
  res.locals.currUser = req.user;
  next();
});

app.get("/", async(req,res) =>{
  let allListing =await listing.find({});
  res.render("./listing/index.ejs",{allListing});
});


app.use("/listings",listingsRouter);
app.use("/listings/:id/review",reviewsRouter);
app.use("/",userRouter);

