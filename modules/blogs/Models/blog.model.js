const mongoose = require("mongoose");

const blogSchema = require("../schema/blog.schema")

const blogModel = mongoose.model("blogy",blogSchema) ;

module.exports = blogModel ;