/*
Import external libraries
*/
import passport from 'passport';
import passportJWT from 'passport-jwt';

/*
Import internal libraries
*/
import { User } from '../database';
import config from '../../../config';

/*
Constants
*/
const { ExtractJwt, Strategy: JwtStrategy } = passportJWT;

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
