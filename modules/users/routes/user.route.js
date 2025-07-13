const app = require("express").Router()
const {getAllUsers,addUser,signIn,verifyUser} = require ("../controllers/user.controller");
const validatee = require("../../../Validation/common.validator");
const {addUserValidate,signInvalidate} = require ("../joi/user.validator");
const bcrypt = require("bcrypt");
const isAuthorized = require ("../../../conigration/isAuthorized")
const {GET_ALL_USERS,DELETE_USERS} = require ("../endPoints");


app.get("/getAllUsers/:userID",getAllUsers)
app.post("/addUser",validatee(addUserValidate),addUser);
app.post("/signIn",validatee(signInvalidate),signIn);
app.get("/verifyUser", verifyUser)

module.exports =app