const blog = require("../Models/blog.model")
const commentt = require ("../../comments/schema/comments.schema")
const getAllBlogs = async (req,res) => {
    // pagination
    let {page,size} = req.query;
    if(!page){
        page = 1
    }
    if(!size){
        size = 10
    }
    const newcommens = [];
   const cuersorr = blog.find({}).cursor();
   for(let doc = await cuersorr.next(); doc!=null; doc = await cuersorr.next()){
    const commens = await commentt.find({blogId: doc._doc._id});
    const obj ={...doc._doc,commens}
    newcommens.push(obj)
    console.log(commens);
    
    res.json({message:"yarbbbb isa",newcommens})
   }
}
const addBlogs = async (req,res) => {
    const { title, description,userId } = req.body;

    // console.log(req.user);
        await blog.insertMany({title,description,userId,blogImgUrl: req.file.path}).then(()=>{
            console.log("user =>", req.user);
        res.send ("el-hamudallah");
    }).catch(err => res.json({message : "error",err}))
}


const deleteBlog = async (req,res) => {
    const _id = req.params.id
    await blog.deleteOne({_id}).then(()=>{
        res.send ("el-hamudallah-deleted");
    }).catch(err => res.json({message : "error",err}))
}


const updateBlog = async (req,res) => {
    const _id = req.params.id
    const {title , descrption} = req.body
    await blog.updateOne({_id},{title,descrption}).then(()=>{
        res.send ("el-hamudallah-updated");
    }).catch(err => res.json({message : "error",err}))
}

module.exports = {
    getAllBlogs,
    addBlogs,
    updateBlog,
    deleteBlog
}