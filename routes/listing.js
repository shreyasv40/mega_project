const express = require("express");
const router = express.Router();
const {isLogedIn, isowner, saveUrl} = require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


router.route("/")
.get(listingController.index)
.post(upload.single('listing[image]'),listingController.saveListing);



router.get("/new",isLogedIn,listingController.newListing);


router.route("/:id")
.get(listingController.showListing)
.put(isLogedIn,upload.single('listing[image]'),listingController.editedListing)
.delete(isLogedIn,listingController.deletedListing);



router.get("/edit/:id",isLogedIn,listingController.editListingForm);

module.exports = router;