const passport = require("passport");
const jwt = require("jsonwebtoken");

exports.loginPost = (req, res, next) => {
    passport.authenticate("local", {session: false}, (err, user, info) => {
        if (err || !user ) {
            // TODO: confirm you should be using this rather than another status code; see 
            // what error mongoose might return previously etc.
            return res.status(400).json({
                message: "Something is not right",
                user,
            });
        }
        req.login(user, {session: false}, err => {
            if (err) {
                res.send(err);
            }
            // NOTE: must convert mongoose document to JSON for payload
            const token = jwt.sign(user.toJSON(), process.env.JWT_STRATEGY_SECRET);
            return res.json({user, token});
        });
    })(req, res);
};
