const express = require("express");
const router = express.Router({mergeParams: true});
const listing = require("../models/listing.js");
const review = require("../models/review.js");


router.post("/", async (req,res) =>{
    let {id} = req.params;
    let thisListing = await listing.findById(req.params.id);
    let newreview = await new review(req.body.review);
    await newreview.save();
    thisListing.reviews.push(newreview);
    await thisListing.save();
    req.flash("success","Review is added");
    res.redirect(`/listings/${id}`);
});

router.delete("/:reviewid", async(req,res) =>{
    let {id, reviewid} = req.params;
    let listingdelid = await listing.findByIdAndUpdate(id,{$pull: {reviews: reviewid}});
    let deleteReview = await review.findByIdAndDelete(reviewid);
    req.flash("success","Review is deleted successfully");
    res.redirect(`/listings/${id}`);
});

module.exports = router;