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

    signUp = async (req, res, next) => {
        const { email, password } = req.value.body;

        // Check if there is a user with the same email
        const foundUser = await User.findOne({ "local.email": email });
        if (foundUser) {
            return res.status(403).json({ error: 'Email is already in use' });
        }

        // Create a new user
        const newUser = new User({
            method: 'local',
            local: {
                email: email,
                password: password
            }
        });

        await newUser.save();

        // Generate the token
        const token = this.signToken(newUser);
        // Respond with token
        res.status(200).json({ token });
    }

    signIn = async (req, res, next) => {
        // Generate token
        const token = this.signToken(req.user);
        res.status(200).json({ token });
    }


    facebookOAuth = async (req, res, next) => {
        // Generate token
        const token = this.signToken(req.user);
        res.status(200).json({ token });
    }

    secret = async (req, res, next) => {
        console.log('I managed to get here!');
        res.json({ secret: "resource" });
    }
}

export default AuthController;
