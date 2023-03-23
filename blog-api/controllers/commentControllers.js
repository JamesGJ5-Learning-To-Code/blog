const Comment = require("../models/comment");
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");

// TODO: protect against those not authenticated as the blogger if post is unpublished
exports.getComments = (req, res, next) => {
    Comment.find({postCommentedOn: req.params.postid})
        .sort({createdAt: -1})
    .then(foundComments => res.json(foundComments))
    .catch(err => next(err));
};

// TODO: for postComment and putComment, require authentication of the COMMENTER. For 
// deleteComment, require authentication of the commenter OR the blogger.

exports.postComment = [
    body("text")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please give this comment some text")
        .escape(),
    body("authorEmail")
        .trim()
        .isEmail()
        .withMessage("Please give this comment a valid author email")
        .escape()
        .normalizeEmail(),
    (req, res, next) => {
        const errorResultObject = validationResult(req);
        if (!errorResultObject.isEmpty()) {
            return next(errorResultObject.array());
        }
        const { postid } = req.params;
        Post.findById(postid)
        .then(foundPost => {
            if (foundPost === null) {
                const err = new Error("Post not found");
                err.status = 404;
                return next(err);
            } else if (foundPost.isPublished === false) {
                const err = new Error("Post not published");
                err.status = 403;
                return next(err);
            }
            const { text, authorEmail } = req.body;
            const newComment = new Comment({
                text,
                authorEmail,
                postCommentedOn: postid,
            });
            newComment.save()
            .then(() => next())
            .catch(err => next(err));
        })
        .catch(err => next(err));
    }
];

exports.putComment = [
    body("text")
        .trim()
        .isLength({min: 1})
        .withMessage("Please give this comment some text")
        .escape(),
    (req, res, next) => {
        const errorResultObject = validationResult(req);
        if (!errorResultObject.isEmpty()) {
            return next(errorResultObject.array());
        }
        const { text } = req.body;
        const { commentid } = req.params;
        const updateComment = new Comment({
            text,
            _id: commentid,
        });
        Comment.findByIdAndUpdate(commentid, updateComment, {})
        .then(() => next())
        .catch(err => next(err));
    }   
];

exports.deleteComment = (req, res, next) => {
    // TODO: consider whether commenter should only be able to delete their comments that 
    // are on published posts etc
    const { commentid } = req.params;
    Comment.findByIdAndDelete(commentid)
    .then(() => next())
    .catch(err => next(err));
};
