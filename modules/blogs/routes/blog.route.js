const app = require ("express").Router();
const { getAllBlogs,addBlogs,deleteBlog,updateBlog} = require("../controllers/blog.controller");
const {ADD_BLOG} = require ("../../users/endPoints");
const isAuthorized = require ("../../../conigration/isAuthorized");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb (null,"./uploads");
    },
    filename: function(req,file,cb){
        let prexy = Date.now()+ '-'+ Math.round(Math.random()*1E9)
        cb (null, prexy + `-` + file.originalname);
    }
})
const upload = multer({storage:storage})

app.get("/getAllBlogs",getAllBlogs) ; 
app.post ("/addBlog",isAuthorized(ADD_BLOG),upload.single("blogImg"),addBlogs) ;
app.put("/updateBlog/:id",updateBlog) ;
app.delete("/deleteBlog/:id",deleteBlog) ; 
module.exports = app ;