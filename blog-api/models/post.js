const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    isPublished: {type: Boolean, required: true},
}, {
    timestamps: true
});

module.exports = mongoose.model("Post", PostSchema);
