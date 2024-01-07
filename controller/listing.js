const listing = require("../models/listing.js");

module.exports.index = async (req,res) =>{
    let allListing =await listing.find({});
    res.render("./listing/index.ejs",{allListing});
}

module.exports.newListing = (req,res) =>{
    res.render("./listing/new.ejs");
}

module.exports.showListing = async(req,res) =>{
        let {id} = req.params;
        let showListing =await listing.findById(id).populate({path: "reviews", populate:{path: "author"}}).populate("owner");
        if(!showListing){
        req.flash("fail","Listing doesn't exist");
            res.redirect("/listings");
        }
        else{
            res.render("./listing/show.ejs",{showListing});
        }
}

module.exports.saveListing = async(req,res) =>{
    let url = req.file.path;
    let filename = req.file.filename;


    let newlisting = await new listing(req.body.listing);
    newlisting.owner = res.locals.currUser;
    newlisting.image.url = url;
    newlisting.image.filename = filename;
    newlisting.save();
    req.flash("success","listing is added");
    res.redirect("/listings");
}

module.exports.editListingForm = async(req,res) =>{
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
    }
}

module.exports.editedListing = async(req,res) =>{
    let {id} = req.params;
    let updated = req.body.listings;
    const Listing = await listing.findByIdAndUpdate(id,updated);

    let url = req.file.path;
    let filename = req.file.filename;

    if(typeof req.file !== "undefined"){
    Listing.image.url = url;
    Listing.image.filename = filename;
    req.flash("success","Listing is Updated");
    res.redirect("/listings");
    Listing.save();
    }
}

module.exports.deletedListing = async(req,res) =>{
    let {id} = req.params;
    const list = await listing.findById(id);
    if(!list.owner.equals(res.locals.currUser._id)){
        req.flash("fail","You do not delete this listing because this is not your listing");
        return res.redirect(`/listings/${id}`);
        }
    await listing.findByIdAndDelete(id);
    req.flash("success","listing is deleted successfully");
    res.redirect("/listings");
}