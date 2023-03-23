const Comment = require("../models/comment");
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");

// TODO: If the post in question is unpublished, authenticate such that these comments can 
// only be retrieved by the blogger
exports.getComments = (req, res, next) => {
    Comment.find({postCommentedOn: req.params.postid})
        .sort({createdAt: -1})
    .then((foundComments) => {
        res.json(foundComments);
    })
    .catch((err) => next(err));
};

// TODO: for all of the below, require authentication of the COMMENTER

exports.postComment = [
    body("text")
        .trim()
        .isLength({min: 1})
        .withMessage("Please give this comment some text")
        .escape(),
    body("authorEmail")
        .isEmail()
        .withMessage("Please give this comment a valid author email")
        .trim()
        .escape()
        .normalizeEmail(),
    (req, res, next) => {
        const errorResultObject = validationResult(req);
        if (!errorResultObject.isEmpty()) {
            // TODO: sort out this error handling in particular
            return next(errorResultObject.array());
        }
        Post.findById(req.params.postid)
        .then((foundPost) => {
            // TODO: review the below; might be able to replace it with orFail()
            if (foundPost === null) {
                const err = new Error("Post not found");
                err.status = 404;
                return next(err);
            // TODO: review the below
            } else if (foundPost.isPublished === false) {
                const err = new Error("Post not published");
                err.status = 403;
                return next(err);
            }
            const newComment = new Comment({
                text: req.body.text,
                authorEmail: req.body.authorEmail,
                postCommentedOn: req.params.postid,
            });
            newComment.save()
            .then(() => next())
            .catch((err) => next(err));
        })
        .catch(err => next(err));
    }
];

exports.putComment = (req, res, next) => {
    res.send("TODO: implement putComment");
};

exports.deleteComment = (req, res, next) => {
    // TODO: consider whether commenter should only be able to delete their comments that 
    // are on published posts etc; there may be privacy laws relevant here
    Comment.findByIdAndDelete(req.params.commentid)
    .then(() => next())
    .catch((err) => next(err));
};
