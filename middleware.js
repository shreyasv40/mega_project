const listing = require("./models/listing.js");
module.exports.isLogedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("fail","you are not loged in");
       return res.redirect("/login");
    }
    next();
}  

module.exports.saveUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirect = req.session.redirectUrl;
    }
    next();
}

// module.exports.isowner = (req,res,next) =>{
//        if(!listing.owner.equals(res.locals.currUser._id)){
//         req.flash("fail","You do not change this listing information");
//         return res.redirect(`/listings/${id}`);
//         }
// }