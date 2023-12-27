const review = require("../models/review.js");
const listing = require("../models/listing.js");


module.exports.saveReview =  async (req,res) =>{
    let {id} = req.params;
    let thisListing = await listing.findById(req.params.id);
    let newreview = await new review(req.body.review);
    newreview.author = req.user;
    console.log("req.user: ",req.user);
    await newreview.save();
    thisListing.reviews.push(newreview);
    await thisListing.save();
    req.flash("success","Review is added");
    res.redirect(`/listings/${id}`);
}

module.exports.deletedReview =  async(req,res) =>{
    let {id, reviewid} = req.params;
    let list = await review.findById(reviewid);
    console.log("This is a review: ",list.author._id);
    console.log("current user: ",res.locals.currUser._id);
    if(!list.author._id.equals(res.locals.currUser._id)){
        req.flash("fail","You do not delete review because this is not your review");
        return     res.redirect(`/listings/${id}`);

    }
    let delreview = await review.findByIdAndDelete(reviewid);
    req.flash("success","Review is deleted successfully");
    res.redirect(`/listings/${id}`);
}