const listing = require("./model.js")
const Review = require("./review.js")
module.exports.isloggedin=(req,res,next)=>{
    // console.log(req.path,"..",req.originaUrl)
    if(!req.isAuthenticated()){

        req.session.redirectUrl=req.originalUrl;
        console.log(req.session.redirectUrl)
        req.flash("error","'you have must be loggin")
    return res.redirect("/login")
    }
    next()
}

module.exports.saveRedUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl
    }
    next()
}


module.exports.isowner =async (req,res,next)=>{
    let {id} = req.params
    let listings = await listing.findById(id);
    if(!listings.Owner.equals(res.locals.CurrUser._id)){
        req.flash("error","you are not Owner of this listing")
        return     res.redirect(`/listing/${id}`)
    }
    next()
}

module.exports.isreviewAuthor =async (req,res,next)=>{
    let {id,reviewId} = req.params
    let review = await Review.findById(reviewId);
    if(!review.auther.equals(res.locals.CurrUser._id)){
        req.flash("error","you are not Owner of this review")
        return     res.redirect(`/listing/${id}`)
    }
    next()
}