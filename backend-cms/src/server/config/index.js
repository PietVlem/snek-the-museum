/*
Import the external libraries:
- dotenv
*/
import dotenv from 'dotenv';

// Activatie the dotenv settings from .env file
dotenv.config();

// Create configuration object
const config = {
    nodeEnvironment: process.env.NODE_ENV,
    nodeHostname: process.env.NODE_SERVER_HOSTNAME,
    nodePort: process.env.NODE_SERVER_PORT,
    mongoDbConnectionstring: process.env.MONGODB_CONNECTION,
    auth: {
        bcrypt: {
            saltWorkFactor: 10,
        },
        jwtSecret: process.env.AUTH_JWT_SECRET,
        jwtSession: {
            session: process.env.AUTH_JWT_SESSION,
        },
        facebook: {
            clientID: process.env.AUTH_FACEBOOK_CLIENT_ID,
            clientSecret: process.env.AUTH_FACEBOOK_CLIENT_SECRET,
        },
    },
    pwReset:{
        baseUrl: process.env.RESET_PASSWORD_URL,
        service: process.env.RESET_PASSWORD_SERVICE,
        mailAccount: process.env.RESET_PASSWORD_GMAIL_ACCOUNT,
        mailAccountPw: process.env.RESET_PASSWORD_GMAIL_PASSWORD
    }
};

export default config;
