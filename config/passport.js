// Need to npm for this packages
const passport = require ("passport");
const LocalStrategy = require ("passport-local").Strategy;

const db = require("../models")


passport.use(new LocalStrategy(
    {
        usernameField: "email"
    },
    function(email, password, done){
        db.user.findOne({
            where: {
                email: email
            }

        }).then(function(dbUser){
            console.log({dbUser});
            
            if(!dbUser){
                return done(null, false,{
                    message: "Incorrect Email."
                });
            }

            else if (!dbUser.validPassword(password)){
                return done(null, false, {
                    message: "Incorrect password."
                });
            }
            return done(null, dbUser);
        });
    }
));


passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
  
  
  module.exports = passport;
  
