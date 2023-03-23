const Post = require("../models/post");
const Comment = require("../models/comment");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

// TODO: have it so that, if the authentication is successful, ALL posts are retrieved, but 
// if the authentication is unsuccessful, only published posts are retrieved; might have to 
// permit a certain token to be given to the visitor that logs in if they log in 
// unsuccessfully, with that token allowing only the former set of posts to be retrieved
exports.getPosts = (req, res, next) => {
    Post.find({})
        .sort({createdAt: -1})
    .then((foundPosts) => {
        res.json(foundPosts);
    })
    // TODO: sort out 'next'
    .catch((err) => next(err));
};

// TODO: protect when the post is unpublished
exports.getPost = (req, res, next) => {
    Post.findById(req.params.postid)
    .then((foundPost) => {
        // TODO: review the below; might be able to replace it with orFail()
        if (foundPost === null) {
            const err = new Error("Post not found");
            err.status = 404;
            return next(err);
        }
        res.json(foundPost);
    })
    // TODO: sort out next below
    .catch((err) => next(err));
};

// TODO: this needs to be protected
exports.postPost = [
    body("title")
        .trim()
        .isLength({min: 1})
        .withMessage("Please give this post a title")
        .escape(),
    body("text")
        .trim()
        .isLength({min: 1})
        .withMessage("Please give this post some text")
        .escape(),
    body("isPublished")
        .toBoolean(),
    (req, res, next) => {
        const errorResultObject = validationResult(req);
        if (!errorResultObject.isEmpty()) {
            // TODO: sort out this error handling in particular
            return next(errorResultObject.array());
        }
        const newPost = new Post({
            title: req.body.title,
            text: req.body.text,
            isPublished: req.body.isPublished,
        });
        newPost.save()
        .then(() => {
            // TODO: sort out next
            next();
        })
        // TODO: sort out 'next'
        .catch((err) => next(err));
    }
];

// TODO: protect this
exports.putPost = [
    body("title")
        .trim()
        .isLength({min: 1})
        .withMessage("Please give this post a title")
        .escape(),
    body("text")
        .trim()
        .isLength({min: 1})
        .withMessage("Please give this post some text")
        .escape(),
    body("isPublished")
        // TODO: make sure that, if isPublished isn't supplied in req.body, this function 
        // will indeed make it false
        .toBoolean(),
    (req, res, next) => {
        const errorResultObject = validationResult(req);
        if (!errorResultObject.isEmpty()) {
            // TODO: sort out this error handling in particular
            return next(errorResultObject.array());
        }
        const updatePost = new Post({
            title: req.body.title,
            text: req.body.text,
            isPublished: req.body.isPublished,
            _id: req.params.postid,
        });
        Post.findByIdAndUpdate(req.params.postid, updatePost, {})
        .then(() => next())
        .catch((err) => next(err));
    }
];

// TODO: protect this
// TODO: add to this the deletion of all comments under this post
exports.deletePost = (req, res, next) => {
    Comment.deleteMany({postCommentedOn: req.params.postid})
    .then(() => {
        Post.findByIdAndDelete(req.params.postid)
        .then(() => {
            // TODO: sort out 'next'
            return next();
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};
