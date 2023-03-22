const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: {type: String, required: true},
    authorEmail: {type: String, required: true},
    postCommentedOn: {type: Schema.Types.ObjectId, required: true},
}, {
    timestamps: true,
});

module.exports = mongoose.model("Comment", CommentSchema);
