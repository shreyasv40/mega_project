module.exports.isLogedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        req.flash("fail","you are not loged in");
       return res.redirect("/login");
    }
    next();
}  