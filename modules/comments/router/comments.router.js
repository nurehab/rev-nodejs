const app = require("express").Router()

const commentdbdb = require("../schema/comments.schema");
const blogDb = require ("../../blogs/Models/blog.model")
app.post("/addComment", async(req,res)=>{
    let {content , createdBy , blogId} = req.body
    const commentdb = new commentdbdb({content,createdBy,blogId});
    const ressComment = await commentdb.save();
    res.json({message:"yarb isa",ressComment})
})



//     const commenter = await blogDb.findOne({_id:blogId})
//     if(commenter){
//         const newcommentArr = [...commenter.comments , ressComment._id]
//         const updateBlog = await blogDb.updateOne({_id:blogId},{comments:newcommentArr});
//         res.json({message:"el hamdullllllah",updateBlog});
//     }else{
//         res.send("sorrrrrrrrrrrrrry")
//     }
// })

module.exports = app ;
