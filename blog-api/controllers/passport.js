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
        User.findOne({username, password})
            .then(user => {
                if (!user) {
                    return done(null, false, {message: "Incorrect username or password."})
                }
                done(null, user, {message: "Logged in Successfully"});
            })
            .catch(err => done(err));
    }
));

// NOTE: For protecting certain routes
passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_STRATEGY_SECRET,
    },
    (jwtPayload, done) => {
        // TODO: consider whether top-level return here is needed
        // NOTE: have to explicitly choose _id rather than id below, since the payload 
        // is no longer a mongoose document (see conversion to JSON in loginPost controller)
        return User.findById(jwtPayload._id)
            .then(user => {
                return done(null, user);
            })
            .catch(err => done(err));
    }
));
