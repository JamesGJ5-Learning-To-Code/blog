const Comment = require("../models/comment");
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

// TODO: extract the isPublished === false check and authentication as prior middleware in 
// an array below to escape callback hell
exports.getComments = (req, res, next) => {
    const { postid } = req.params;
    Post.findById(postid)
    .then(foundPost => {
        if (foundPost.isPublished === false) {
            passport.authenticate('jwt', { session: false }, (err, user, info) => {
                console.log("Hello");
                if (err || !user) {
                    // TODO: return same thing as in passport
                    return next(err)
                }
            })(req, res, next);
        }
        Comment.find({postCommentedOn: postid})
            .sort({createdAt: -1})
        .then(foundComments => res.json(foundComments))
        .catch(err => next(err));
    })
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
            // TODO: send error messages in response
            return res.sendStatus(400);
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
            .then(() => res.sendStatus(200))
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
            // TODO: send error messages in response
            return res.sendStatus(400);
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
    .then(() => res.sendStatus(200))
    .catch(err => next(err));
};
