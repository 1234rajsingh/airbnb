const loginUser = require("../login.js");

module.exports.singupuser = async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const user1 = new loginUser({email,username})
       const register= await loginUser.register(user1,password)
    //    console.log(register)
       req.login(register,(err)=>{
        if(err){
            return next(err)
        }
        req.flash("sucess","welcome to wanderlust")
        res.redirect("/listing");
       })
      
    }
    catch(e){
        req.flash("error",e.message)
        res.redirect("/login")

    }
   
}

module.exports.loginuser = async(req,res)=>{
    req.flash("sucess","welcome to wanderlust")
    let redirectUrl = res.locals.redirectUrl || "/listing"
    res.redirect(redirectUrl)
}

module.exports.deleteuser = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
        return next(err)
        }
        req.flash("sucess","your are logout now")
        res.redirect("/listing")
    })
   
}