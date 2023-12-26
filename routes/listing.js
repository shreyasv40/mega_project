const express = require("express");
const router = express.Router();
const listing = require("../models/listing.js");
const {isLogedIn, isowner, saveUrl} = require("../middleware.js");
const listingController = require("../controller/listing.js");

router.route("/")
.get(listingController.index)
.post(isLogedIn,listingController.saveListing);


router.get("/new",isLogedIn,listingController.newListing);


router.route("/:id")
.get(listingController.showListing)
.put(isLogedIn,listingController.editedListing)
.delete(isLogedIn,listingController.deletedListing);



router.get("/edit/:id",isLogedIn,listingController.editListingForm);

module.exports = router;