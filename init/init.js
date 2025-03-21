const mongoose = require("mongoose");
const initdata = require("./data (1).js");
const listing= require("../model.js");
const MongoDb = 'mongodb://127.0.0.1:27017/airbnb';
main()
.then(()=>{
    console.log("connect sucesfull")
})
.catch(()=>{
    console.log("fail")
})
async function main() {
    mongoose.connect(MongoDb);
}

const initdb = async()=>{
    await listing.deleteMany({})
    initdata.data=initdata.data.map((obj)=>({...obj,Owner:"678f5652a8a175cf2a6923d5"}))
    await listing.insertMany(initdata.data)
}
initdb()