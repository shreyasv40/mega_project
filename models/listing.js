const a = 10;
const mongoose = require("mongoose");
const {Schema} = mongoose;
const listingSchema = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        filename: {
            type: String
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        },
    },
    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "review",
        }
    ],
   

});

const listing = mongoose.model("listing",listingSchema);
module.exports = listing;