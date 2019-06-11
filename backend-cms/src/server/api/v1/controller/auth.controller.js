/*
Import the internal libraries:
- * from database
- errorHandler
*/
import jwt from 'jsonwebtoken';

import { APIError, handleAPIError, createToken } from '../../../utilities';
import config from '../../../config';
import { User } from '../database';
import cryptoRandomString from 'crypto-random-string';
import nodemailer from 'nodemailer';


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
        const { email, password, name, dayOfBirth } = req.value.body;

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
            },
            name: name,
            userRole: 'user',
            dayOfBirth: dayOfBirth
        });

        await newUser.save();

        // Generate the token
        const token = this.signToken(newUser);
        // Respond with token
        res.status(200).json({ 
            token: token,
            userId: req.user.id,
            userRole: req.user.userRole,
         });
    }

    signIn = async (req, res, next) => {
        // Generate token
        const token = this.signToken(req.user);

        res.status(200).json({
            token: token,
            userId: req.user.id,
            userRole: req.user.userRole,
        });
    }

    facebookOAuth = async (req, res, next) => {
        // Generate token
        const token = this.signToken(req.user);
        res.status(200).json({ 
            token: token,
            userId: req.user.id,
            userRole: req.user.userRole,
         });
    }

    secret = async (req, res, next) => {
        res.json({ secret: "you found a secret unicorn, hihi :)" });
    }

    forgot = async (req, res, next) => {
        const randomString = cryptoRandomString({ length: 20, type: 'url-safe' });
        User.findOne({ "local.email": req.body.email }, async function (err, user) {
            if (!user) {
                res.json({ "message": "No User found with that email!" })
            } else {
                user.resetPasswordToken = randomString;
                user.resetPasswordExpires = Date.now() + 3600000;

                await user.save();

                var transport = nodemailer.createTransport({
                    service: config.pwReset.service,
                    auth: {
                        user: config.pwReset.mailAccount,
                        pass: config.pwReset.mailAccountPw
                    }
                });
                var mailOptions = {
                    to: user.local.email,
                    from: config.pwReset.mailAccount,
                    subject: 'Snek the museum Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        'http://' + config.pwReset.baseUrl + '/reset/' + randomString + '\n\n' +
                        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                await transport.sendMail(mailOptions, function (err) {
                    res.json({ 'info': 'An e-mail has been sent to ' + user.local.email + ' with further instructions.' });
                });
            }
        });
    }

    reset = async (req, res, next) => {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, async function (err, user) {
            if (!user) {
                res.json({ 'error': 'Password reset token is invalid or has expired.' });
            } else {
                user.local.password = req.body.password;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                await user.save();

                var transport = nodemailer.createTransport({
                    service: config.pwReset.service,
                    auth: {
                        user: config.pwReset.mailAccount,
                        pass: config.pwReset.mailAccountPw
                    }
                });
                var mailOptions = {
                    to: user.local.email,
                    from: config.pwReset.mailAccount,
                    subject: 'Snek the museum Password Reset',
                    text: 'your password has been reset!'
                };
                await transport.sendMail(mailOptions, function (err) {
                    res.json({ 'info': 'An e-mail has been sent to ' + user.local.email + ' with the confirmation that your password is reset!' });
                });
            }
        });
    }
}

export default AuthController;