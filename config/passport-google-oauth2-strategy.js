const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
        clientID:"706630960175-mk0q3tt4mfl3e1pgabfqun3tph9psedo.apps.googleusercontent.com",
        clientSecret:"Iy1oARSQnCvNn2qoyHMHhmJQ",
        callbackURL:"http://localhost:8000/users/auth/google/callback",

    },
    function(accessToken,refreshToken,profile,done)
    {
        User.findOne({email:profile.emails[0].value}).exec(function(err,user)
        {
            if(err)
            {
                console.log('Error in google strategy-passport',err);
                return;
            }
            console.log(profile);
            if(user)
            {
                return done(null,user);
            }
            else
            {
                User.create({
                    name:profile.displayName,
                    email:profile.email[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user)
                {
                    if(err)
                    {
                        console.log('Error in google strategy-passport',err);
                        return;
                    }
                    done(null,user);
                });

            }
        });
    }
));
module.exports = passport;