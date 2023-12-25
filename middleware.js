module.exports.isLogedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        console.log(req.originalUrl);
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