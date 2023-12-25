const express = require("express");
const router = express.Router();
const listing = require("../models/listing.js");
const {isLogedIn, isowner} = require("../middleware.js");





router.get("/",async (req,res) =>{
    let allListing =await listing.find({});
    res.render("./listing/index.ejs",{allListing});
});

router.get("/new",isLogedIn,(req,res) =>{
    res.render("./listing/new.ejs");
});

router.get("/:id",async(req,res) =>{
    console.log(req.user);
        let {id} = req.params;
        let showListing =await listing.findById(id).populate({path: "reviews", populate:{path: "author"}}).populate("owner");
        if(!showListing){
        req.flash("fail","Listing doesn't exist");
            res.redirect("/listings");
        }
        else{
            res.render("./listing/show.ejs",{showListing});
        }
});

router.post("/",isLogedIn,async(req,res) =>{
    let newlisting = await new listing(req.body.listing);
    console.log(res.locals.currUser);
    newlisting.owner = res.locals.currUser;
    newlisting.save();
    req.flash("success","listing is added");
    res.redirect("/listings");
});
router.get("/edit/:id",isLogedIn,async(req,res) =>{
    let {id} = req.params;
    let newlisting =await listing.findById(id);
    if(!newlisting){
    req.flash("fail","Listing doesn't exist");
    res.redirect("/listings");
    }
    else{
        if(!newlisting.owner._id.equals(res.locals.currUser._id)){
            req.flash("fail","You do not change this listing information");
            return res.redirect(`/listings/${id}`);
            }
        res.render("./listing/edit.ejs",{newlisting});
        // console.log("newlisting.owner: ",newlisting.owner);
        // console.log("res.locals.currUser",res.locals.currUser);
    }
});

router.put("/edit/:id",isLogedIn,async(req,res) =>{
    let {id} = req.params;
    let updated = req.body.listings;
    await listing.findByIdAndUpdate(id,updated);
    req.flash("success","Listing is Updated");
    res.redirect("/listings");
});  

router.delete("/delete/:id",isLogedIn,async(req,res) =>{
    let {id} = req.params;
    if(!await listing.owner.equals(res.locals.currUser._id)){
        req.flash("fail","You do not change this listing information");
        return res.redirect(`/listings/${id}`);
        }
    await listing.findByIdAndDelete(id);
    req.flash("success","listing is deleted successfully");
    res.redirect("/listings");
});

module.exports = router;