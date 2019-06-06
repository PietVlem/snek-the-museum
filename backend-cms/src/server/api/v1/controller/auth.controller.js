/*
Import the internal libraries:
- * from database
- errorHandler
*/
import jwt from 'jsonwebtoken';

import { APIError, handleAPIError, createToken } from '../../../utilities';
import config from '../../../config';
import { User } from '../database';


class AuthController {
    loginLocal = async (authService, req, res, next) => {
        authService.passport.authenticate('local', config.jwtSession, (err, user, info) => {
            if (err) { return next(err); }
            if (!user) {
                return next(new Error("kkjkj"));
            }
            req.auth = {
                id: user.id,
            };
            const token = createToken(req.auth);
            return res.status(200).json({
                email: user.email,
                token: `${token}`,
                strategy: 'local',
            });
        })(req, res, next);
    };

    signToken = user => {
        return jwt.sign({
            iss: 'CodeWorkr',
            sub: user.id,
            // Date created
            iat: new Date().getTime(),
            // Experation: current time + 1 day ahead
            exp: new Date().setDate(new Date().getDate() + 1)
        }, config.auth.jwtSecret);
    }

    signIn = async (req, res, next) => {
        // generate token
        const token = this.signToken(req.user);
        res.status(200).json({token});
    }

    signUp = async (req, res, next) => {
        const { email, password } = req.value.body;

        // Check if email exists
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(403).send({
                error: 'Email is already in use'
            })
        }

        // Create new user
        const newUser = new User({ email, password });
        await newUser.save();

        // Generate token
        const token = this.signToken(newUser);

        // Respond with token
        res.status(200).json({ token });
    }

    secret = async (req, res, next) => {
        console.log('I managed to get here');
        res.json({ secret: "resource" });
    }
}

export default AuthController;
