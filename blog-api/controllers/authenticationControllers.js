const passport = require("passport");
const jwt = require("jsonwebtoken");

exports.loginPost = (req, res, next) => {
    passport.authenticate("local", {session: false}, (err, user, info) => {
        if (err || !user ) {
            // TODO: confirm you should be using this rather than another status code; see 
            // what error mongoose might return previously etc.
            return res.status(400).json({
                message: "Something is not right",
                // TODO: used ES6 feature below, make sure it doesn't cause issues
                user,
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            // NOTE: contrary to the tutorial mentioned in plans.md, which isn't 
            // specific to Mongoose, have to convert document to JSON below for payload 
            // to be acceptable by the jwt.sign method
            const token = jwt.sign(user.toJSON(), process.env.JWT_STRATEGY_SECRET);
            return res.json({user, token});
        });
    })(req, res);
};
