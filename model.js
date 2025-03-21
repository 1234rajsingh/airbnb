const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true,
    },
    image:{
       url:String,
       filenama:String,
    },
    price:{
        type : Number,
        
        
    },
    location:{
        type :String
    },
    country:{
        type:String
    },
    review:[
        {
type:Schema.Types.ObjectId,
ref:"Review"
        }
    ],
    Owner:
        {
type:Schema.Types.ObjectId,
ref:"loginUser"
        }
    
})
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in: listing.review}})
    }
})
const listing = mongoose.model("listing",listingSchema);
module.exports = listing