const { StatusCodes } = require("http-status-codes");
const user = require("../Model/user.model");
const bcrypt = require ("bcrypt");
var jwt = require('jsonwebtoken');
const nodemailer = require ("nodemailer")
const blogD = require ("../../blogs/Models/blog.model")

const getAllUsers = async (req,res)=>{
    const newuserArr = [];
    let dbdb = user.find({}).select("-password").cursor();
    for (let docc = await dbdb.next(); docc!= null ; docc = await dbdb.next()){
        const blogdd = await blogD.find({userId:docc._id});
        const obje = {...docc._doc,blogdd}
        newuserArr.push(obje);
    }
    res.status(StatusCodes.OK).json({message:"el7",newuserArr})
}

const addUser = async (req,res)=>{
    const {userName,email,password,role} = req.body
try {
    const hamo = await user.findOne({email:email})
    if (hamo) {
    return res.status(StatusCodes.BAD_REQUEST).json({message:"this email is already register"});
    }else{
        let hamada = new user({userName,email,password,role,isAuth:false})
        await hamada.save();
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
              user: "vevo4zszs5@gmail.com",
              pass: "cugt nxog hwjb tjfv",
            },
          });
          let token = jwt.sign({ email }, 'shhhhh');
          await transporter.sendMail({
            from: '"t1" <vevo4zszs5@gmail.com>',
            to: "ehabaly2222@gmail.com",
            subject: "Hello ✔",
            text: "Hello world?", // plain‑text body
            html: ``,
            attachments:[
              {
            filename: 'invoice.pdf',
            path: 'invoice.pdf',                                          
            contentType: 'application/pdf'
        }  
            ], 
          });
          return res.status(StatusCodes.OK).json({message:"Added"});
    }
    
} catch (error) {
    console.log("Error:", error);
return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"something went wrong", error: error.message});
} 
}

const signIn= async (req,res)=>{
    const {email,password} = req.body;
    try {
        const foundUser = await user.findOne({email});
        if(!foundUser){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"la"})
        }else{
            const match = await bcrypt.compare(password , foundUser.password)
            if(!match){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"pass ghalat"})
            }else{
                let token = jwt.sign({ role: foundUser.role , email: foundUser.email,_id:foundUser._id }, 'shhhhh');
                return res.status(StatusCodes.OK).json({message:token})
            }
        }
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({message:"laaaaa"})
    }
}
let verifyUser = async (req,res)=>{
    let {token} = req.query
    let emailDecoded = jwt.verify(token, 'shhhhh');
    let uozer = await user.findOne({email:emailDecoded.email})
    if(uozer){
        await user.updateOne({email:emailDecoded.email},{
            isAuth: true ,
            
        })
        res.send("verifed")
    }else{
        res.status(StatusCodes.BAD_REQUEST).json({message:"Not allowed to verify"})
    }
    
}
module.exports = {
    addUser,
    signIn,
    getAllUsers,
    verifyUser
}