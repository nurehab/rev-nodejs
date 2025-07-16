const mongoose = require ("mongoose") ;

const connectionDb = () =>{
    return mongoose.connect(process.env.CONNECTION_STRING,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log("yarb")
    )
}
module.exports = connectionDb ;