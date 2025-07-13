const mongoose = require("mongoose")

const collectionDb = require("../schema/user.schema");

const userModel = mongoose.model("jun",collectionDb);

module.exports = userModel