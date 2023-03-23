const Post = require("../models/post");
const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");

// TODO: successful authentication of blogger should allow ALL posts to be retrieved. 
// Unsuccessful authentication of blogger should allow ONLY PUBLISHED posts to be 
// retrieved. Might just have it so that published posts get a separate route to 
// all posts.
exports.getPosts = (req, res, next) => {
    Post.find({})
        .sort({createdAt: -1})
    .then(foundPosts => {
        res.json(foundPosts);
    })
    .catch(err => next(err));
};

// TODO: protect for unpublished posts
exports.getPost = (req, res, next) => {
    Post.findById(req.params.postid)
    .then(foundPost => {
        if (foundPost === null) {
            const err = new Error("Post not found");
            err.status = 404;
            return next(err);
        }
        res.json(foundPost);
    })
    .catch(err => next(err));
};

exports.postPost = [
    body("title")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please give this post a title")
        .escape(),
    body("text")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please give this post some text")
        .escape(),
    body("isPublished")
        .toBoolean(),
    (req, res, next) => {
        const errorResultObject = validationResult(req);
        if (!errorResultObject.isEmpty()) {
            return next(errorResultObject.array());
        }
        const { title, text, isPublished } = req.body;
        const newPost = new Post({
            title,
            text,
            isPublished,
        });
        newPost.save()
        .then(() => next())
        .catch(err => next(err));
    }
];

exports.putPost = [
    body("title")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please give this post a title")
        .escape(),
    body("text")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please give this post some text")
        .escape(),
    body("isPublished")
        .toBoolean(),
    (req, res, next) => {
        const errorResultObject = validationResult(req);
        if (!errorResultObject.isEmpty()) {
            return next(errorResultObject.array());
        }
        const { title, text, isPublished } = req.body;
        const { postid } = req.params;
        const updatePost = new Post({
            title,
            text,
            isPublished,
            _id: postid,
        });
        Post.findByIdAndUpdate(postid, updatePost, {})
        .then(() => next())
        .catch(err => next(err));
    }
];

exports.deletePost = (req, res, next) => {
    const { postid } = req.params;
    Comment.deleteMany({ postCommentedOn: postid })
    .then(() => {
        Post.findByIdAndDelete(postid)
        .then(() => next())
        .catch(err => next(err));
    })
    .catch(err => next(err));
};
