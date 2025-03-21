const listings = require("../model.js")

module.exports.index = async(req,res)=>{
    let alllisting = await listings.find({})
    res.render("home.ejs",{alllisting});
}

module.exports.createpage = (req,res)=>{
    res.render("new.ejs")
}

module.exports.show=async(req,res)=>{
    let {id}=req.params;
    let listing = await listings.findById(id).populate({path:"review",populate:{path:"auther"}}).populate("Owner");
    if(!listing){
        req.flash("error","listing you request does not exit")
        res.redirect("/listing")
    }
    console.log(listing)
    res.render("show.ejs",{listing})
}

module.exports.createandsave = async(req,res,next)=>{
    let url = req.file.path
    let filename = req.file.filename

    const newlisting = new listings(req.body.listing)
    // console.log(newlisting)
    newlisting.Owner=req.user._id;
    newlisting.image={url,filename}
        await newlisting.save();
        req.flash("sucess","new listings created")
        res.redirect("/listing")


}
module.exports.editroute =async(req,res)=>{
    let {id}=req.params;
    const listing = await listings.findById(id)
    if(!listing){
        req.flash("error","listing you request does not exit")
        res.redirect("/listing")
    }
    let oringalimage = listing.image.url;
   
    res.render("edit.ejs",{listing,oringalimage})
}

module.exports.updateroute = async(req,res)=>{
    let {id}=req.params;
    let raj=await listings.findByIdAndUpdate(id,{...req.body.listing})
    if(typeof req.file !=="undefined"){
    let url = req.file.path
    let filename = req.file.filename
    raj.image={url,filename}
    await raj.save()
    }

    req.flash("sucess"," listings Updated")
    res.redirect(`/listing/${id}`)
// console.log(raj);
}

module.exports.deleteroute = async(req,res)=>{
    let {id}=req.params;
   await listings.findByIdAndDelete(id)
   req.flash("sucess"," listings delete")
   res.redirect("/listing")
}