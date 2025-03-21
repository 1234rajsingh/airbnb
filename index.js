if(process.env.NODE_ENV !="production"){
    require('dotenv').config()
    console.log(process.env)
}



const express = require("express");
const app = express();
const mongoose = require("mongoose");
let port = 8080;
const methodOverride = require('method-override')
const listings = require("./model.js")
const path = require("path")
const ejsMate = require("ejs-mate");
const wrapAsync = require("./util/wrapAsync.js")
const ExpressError = require("./util/expressError.js")
const {listingSchema,reviewSchema} = require("./schemajoi.js")
const Review = require("./review.js")
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash")
const passport = require("passport");
const LocalStrategy = require("passport-local")
const loginUser = require("./login.js")






app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")))
const dburl = process.env.ATALS_URL;

const store = MongoStore.create({
    mongoUrl:dburl,
    crypto: {
        secret:process.env.SECRET,
      },
      touchAfter: 24 * 3600,
      
})


const sessionOption = {
    store,
    secret : process.env.SECRET,
    resolve : false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
}


app.use(session(sessionOption))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session());
passport.use(new LocalStrategy(loginUser.authenticate()))
passport.serializeUser(loginUser.serializeUser())
passport.deserializeUser(loginUser.deserializeUser())



app.use((req,res,next)=>{
    res.locals.sucessmsg = req.flash("sucess")
    res.locals.error = req.flash("error")
    res.locals.CurrUser = req.user;
    next();
})
// app.get("/demo",async(req,res)=>{
//     let newUser = new loginUser({
//         email:"mailtocoolrajsingh@gmail.com",
//         username:"rajsingh"
//     });
//     let regis = await loginUser.register(newUser,"1234rajsingh")
//     res.send(regis)
// })

const listing = require("./routers/listings.js")
const review = require("./routers/reviews.js")
const login = require("./routers/singup.js")

// const MongoDb = 'mongodb://127.0.0.1:27017/airbnb';


main()
.then(()=>{
    console.log("connect sucesfull")
})
.catch(()=>{
    console.log("fail")
})
async function main() {
    mongoose.connect(dburl);
}





app.use("/listing",listing)

app.use("/listing/:id/review",review)
app.use("/",login)





app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"))
})

app.use((err,req,res,next)=>{
let {status=500,message}= err;

res.render("error.ejs",{message})
})






app.listen(port,()=>{
    console.log(`port are working ${port}`)
})





