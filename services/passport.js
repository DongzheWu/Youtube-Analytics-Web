const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

//Serialize user data
passport.serializeUser((user, done) => {
    done(null, user.id);
  });

//Deserialize user data
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      done(null, user);
    });
});
  
//Login with google account
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, 
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleId: profile.id });
   
        if (existingUser) {
          return done(null, existingUser);
        }
        
        //Generate new user data
        const user = await new User({ 
            googleId: profile.id,
            email: profile.displayName,
            displayName: profile.emails[0].value,
            createDate: Date.now(),

        }).save();
        done(null, user);
      }
));