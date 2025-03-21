const express= require("express");
const router = express.Router();
const loginUser = require("../login.js");
const wrapAsync = require("../util/wrapAsync");
const passport = require("passport");
const {saveRedUrl} = require("../loginmiddle.js")
const usersingup = require("../controller/user.js")

router.get("/singup",(req,res)=>{
    res.render("singup.ejs")
})
router.post("/singup",wrapAsync(usersingup.singupuser))

router.get("/login",(req,res)=>{
    res.render("login.ejs")
});

router.post("/login",saveRedUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),usersingup.loginuser)
router.get("/logout",usersingup.deleteuser)
module.exports = router;