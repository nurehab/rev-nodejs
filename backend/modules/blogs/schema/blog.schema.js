const { ref, types } = require("joi");
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title : {type: String , default: "kher-isa"},
    description : {type: String , required : true},
    userId : {type: mongoose.Schema.Types.ObjectId , ref: "jun"},
    blogImgUrl : String 
    // comments : [{type:mongoose.Schema.Types.ObjectId, ref:"comment"}]
});

module.exports = blogSchema ;