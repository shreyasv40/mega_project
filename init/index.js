const a = 10;
const mongoose = require("mongoose");
const listing = require("../models/listing.js");
const review = require("../models/review.js");
const initdata = require("./data.js");

main()
.then(res =>{console.log("database was connected")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonder');
}

const init = async() =>{
    await listing.insertMany(initdata.data);
}
init();

const addData = async () =>{
  // let firstli = await listing.findById("657444d1e166f9afa1a90a6a");
  
  // let newreview = await new review({
  //   rating: 5,
  //   comment: "This is a first of all listings",
  // });

  // firstli.reviews.push(newreview);
  // await newreview.save();
  // await firstli.save();
}

addData();