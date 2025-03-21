const express= require("express");
const router = express.Router();
const listings = require("../model.js")
const wrapAsync = require("../util/wrapAsync.js")
const ExpressError = require("../util/expressError.js")
const {listingSchema,reviewSchema} = require("../schemajoi.js");
const {isloggedin ,isowner}=require("../loginmiddle.js")
const listingcontroler = require("../controller/listing.js")
const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({storage })








// const validatelisting = (req,res,next)=>{
//     let {error} = listingSchema.validate(req.body);
//     console.log(error)
//     if(error){
//         let errmsg = error.details.map((el)=>el.message).join(",");
//         throw new ExpressError(404,errmsg)
//     }else{
//         next()
//     }
// }




// HOME //
router.route("/")
    .get(wrapAsync(listingcontroler.index)) 
    .post(isloggedin,
        upload.single('listing[image]'),
         wrapAsync
        (listingcontroler.createandsave))
    



router.get("/new",isloggedin,listingcontroler.createpage);
// SHOW ROUTE
router.route("/:id")
    .get(wrapAsync(listingcontroler.show)) // GET /:id - Show a specific listing
    .put(isloggedin, isowner, upload.single('listing[image]'), wrapAsync(listingcontroler.updateroute)) 
    .delete(isloggedin, isowner, wrapAsync(listingcontroler.deleteroute));

//CREATE AND SAVE//



////EDITE ROUTE//

router.get("/edit/:id",isloggedin,isowner,wrapAsync(listingcontroler.editroute));

//// UBDATE FORM//


//// DELETE ROUTE//





module.exports = router;