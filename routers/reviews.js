const express= require("express");
const router = express.Router({mergeParams:true});
const listings = require("../model.js")
const wrapAsync = require("../util/wrapAsync.js")
const ExpressError = require("../util/expressError.js")
const {listingSchema,reviewSchema} = require("../schemajoi.js");
const Review = require("../review.js")
const {isloggedin,isreviewAuthor}=require("../loginmiddle.js")
const reviewcontroller = require("../controller/reviews")



const validatereview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    console.log(error)
    if(error){
        let errmsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(404,errmsg)
    }else{
        next()
    }
}



// Review //

router.post("/",isloggedin,validatereview ,wrapAsync(reviewcontroller.createreview))

 //DELETE REVIEWS//
router.delete("/:reviewId",isloggedin,isreviewAuthor,wrapAsync(reviewcontroller.deletereview))

module.exports = router;