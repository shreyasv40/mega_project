const express = require("express");
const router = express.Router();
const listing = require("../models/listing.js");
const {isLogedIn} = require("../middleware.js");





router.get("/",async (req,res) =>{
    let allListing =await listing.find({});
    res.render("./listing/index.ejs",{allListing});
});

router.get("/new",isLogedIn,(req,res) =>{
    res.render("./listing/new.ejs");
});

router.get("/:id",isLogedIn,async(req,res) =>{
    console.log(req.user);
        let {id} = req.params;
        let showListing =await listing.findById(id).populate('reviews');
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
        res.render("./listing/edit.ejs",{newlisting});
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
    await listing.findByIdAndDelete(id);
    req.flash("success","listing is deleted successfully");
    res.redirect("/listings");
});

module.exports = router;