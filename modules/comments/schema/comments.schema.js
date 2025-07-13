const mongoose = require ("mongoose");


const commentSchema = new mongoose.Schema({
    content: String,
    createdBy: {type:
        mongoose.Schema.Types.ObjectId, ref : "jun"
    },
    blogId: {type:
        mongoose.Schema.Types.ObjectId, ref : "blogy"
    }
})

const commentModel = mongoose.model("comment",commentSchema);

module.exports = commentModel;