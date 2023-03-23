const Post = require("../models/post");
const { body, validationResult } = require("express-validator");

// TODO: have it so that, if the authentication is successful, ALL posts are retrieved, but 
// if the authentication is unsuccessful, only published posts are retrieved; might have to 
// permit a certain token to be given to the visitor that logs in if they log in 
// unsuccessfully, with that token allowing only the former set of posts to be retrieved
exports.getPosts = (req, res, next) => {
    // Post.find({})
    //     .sort({createdAt: -1})
    // .then((foundPosts) => {
    //     res.json(foundPosts);
    // })
    // .catch((err) => next(err));
    res.send("TODO: implement getPosts");
};

exports.getPost = (req, res, next) => {
    res.send("TODO: implement getPost");
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
        // TODO: make sure that, if isPublished isn't supplied in req.body, this function 
        // will indeed make it false
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
        .then((savedPost) => {
            res.json(savedPost);
        })
        // TODO: sort out 'next'
        .catch((err) => next(err));
    }
];

exports.putPost = (req, res, next) => {
    res.send("TODO: implement putPost");
};

exports.deletePost = (req, res, next) => {
    res.send("TODO: implement deletePost");
};
