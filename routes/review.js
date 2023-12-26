const express = require("express");
const router = express.Router({mergeParams: true});
const listing = require("../models/listing.js");
const review = require("../models/review.js");
const {isLogedIn, isowner} = require("../middleware.js");
const reviewController = require("../controller/review.js");


router.post("/",isLogedIn,reviewController.saveReview);

router.delete("/:reviewid",isLogedIn,reviewController.deletedReview);

module.exports = router;