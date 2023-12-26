const listing = require("./models/listing.js");
module.exports.isLogedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        // console.log("originalurl: ",req.originalUrl);
        // console.log(req.originalUrl);
        req.flash("fail","you are not loged in");
       return res.redirect("/login");
    }
    next();
}  

module.exports.saveUrl = (req,res,next) =>{
    console.log("original url: ",req.originalUrl);
    if(req.session.redirectUrl){
        res.locals.redirect = req.session.redirectUrl;
        // console.log("req.session.redirectUrl: ",res.locals.redirect);

    }
    next();
}

// module.exports.isowner = (req,res,next) =>{
//        if(!listing.owner.equals(res.locals.currUser._id)){
//         req.flash("fail","You do not change this listing information");
//         return res.redirect(`/listings/${id}`);
//         }
// }