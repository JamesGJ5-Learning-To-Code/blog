const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require("../models/user");

passport.use(new LocalStrategy({
        usernameField: "username",
        passwordField: "password",
    },
    (username, password, done) => {
        // TODO: reconsider whether certain return statements below are needed; some come 
        // from https://dev.to/_arpy/learn-using-jwt-with-passport-authentication-22n8. The 
        // first and last "return" operators probably aren't necessary
        return User.findOne({username, password})
            .then(user => {
                if (!user) {
                    return done(null, false, {message: "Incorrect username or password."})
                }
                return done(null, user, {message: "Logged in Successfully"});
            })
            // TODO: probably can just use "done" rather than "done(err)"
            .catch(err => done(err));
    }
));

// For protecting certain routes
// passport.use(new JWTStrategy({
//         jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//         secretOrKey: process.env.JWT_STRATEGY_SECRET,
//     },
//     (jwtPayload, done) => {
//         // TODO: consider whether top-level return here is needed
//         return User.findById(jwtPayload.id)
//             // TODO: repeating arguments below in "done" might not be necessary since they 
//             // are already arguments in the arrow function
//             .then(user => done(null, user))
//             .catch(err => done(err));
//     }
// ));
