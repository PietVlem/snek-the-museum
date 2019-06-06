/*
Import external libraries
*/
import passport from 'passport';
import passportJWT from 'passport-jwt';
import passportLocal from 'passport-local';
import FacebookTokenStrategy from 'passport-facebook-token';

/*
Import internal libraries
*/
import { User } from '../database';
import config from '../../../config';

/*
Constants
*/
const { ExtractJwt, Strategy: JwtStrategy } = passportJWT;
const { Strategy: LocalStrategy } = passportLocal;

/*
JSON WEB TOKEN STRATEGY
*/
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.auth.jwtSecret
}, async (payload, done) => {
    try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);

        // If user does not exist, handle it
        if (!user) {
            return done(null, false);
        }

        // Otherwise, return the user
        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))

/* 
LOCAL STRATEGY
*/
passport.use(new LocalStrategy({
    usernameField: 'email'
  }, async (email, password, done) => {
    try {
      // Find the user given the email
      const user = await User.findOne({ "local.email": email });

      console.log('user:', user);
      
      // If not, handle it
      if (!user) {
        return done(null, false);
      }

      // Check if the password is correct
      const isMatch = await user.isValidPassword(password);
    
      // If not, handle it
      if (!isMatch) {
        return done(null, false);
      }
    
      // Otherwise, return the user
      done(null, user);
    } catch(error) {
      done(error, false);
    }
  }));

/*
FACEBOOK LOGIN STRATEGY
*/
passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: config.auth.facebook.clientID,
    clientSecret: config.auth.facebook.clientSecret
}, async function (accesToken, refreshToken, profile, done) {
    try {
        console.log('profile', profile);
        console.log('refreshToken', refreshToken);
        console.log('accesToken', accesToken);

        const existingUser = await User.findOne({ "facebook.id": profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }

        const newUser = new User({
            method: 'facebook',
            facebook: {
                id: profile.id,
                email: profile.emails[0].value
            }
        })
        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error, false, error.message)
    }
}))
