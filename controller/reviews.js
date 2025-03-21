const Review = require("../review.js")
const listings = require("../model.js")


module.exports.createreview = async(req,res)=>{
    let listing = await listings.findById(req.params.id)
    let newreview = new Review(req.body.review)
    newreview.auther = req.user._id;
    console.log(newreview)
    listing.review.push(newreview)
    await newreview.save()
    await listing.save()
    req.flash("sucess","new review created")
 res.redirect(`/listing/${listing._id}`)
}

module.exports.deletereview = async(req,res)=>{
    let {id,reviewId}=req.params;
    await listings.findByIdAndUpdate(id,{$pull:{review:reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash("sucess","Review deleted")
   res.redirect(`/listing/${listing._id}`)
}