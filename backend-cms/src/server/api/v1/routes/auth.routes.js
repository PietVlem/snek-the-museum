/*
Import external libraries
*/
import passport from 'passport';

/*
Import the internal libraries
*/
import { AuthController } from '../controller';
import { validateBody, schemas } from '../helpers/routeHelpers';

/* 
Passport authentication option(s)
*/
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const passportFacebook = passport.authenticate('facebookToken', { session: false });

// Create instance of AuthController otherwise you can't use it
const authController = new AuthController();

const initializeEndpoints = (parentRouter, authService) => {
    parentRouter.post('/signUp', validateBody(schemas.registerSchema), authController.signUp);
    /**
     * @swagger
     * /api/v1/signUp:
     *      post:
     *          tags:
     *              - Auth
     *          summary: Create a user to the application
     *          consumes:
     *              - application/json
     *          produces:
     *              - application/json
     *          parameters:
     *              - in: email
     *                name: email
     *                description: your email
     *                required: true
     *              - in: password
     *                name: password 
     *                description: your password 
     *                required: true
     *              - in: name
     *                name: name 
     *                description: your full name
     *                required: true
     *              - in: dayOfBirth
     *                name: dayOfBirth 
     *                description: your birthday 
     *                required: true
     *          responses:
     *              200:
     *                  description: Web token
     */
    parentRouter.post('/signIn', validateBody(schemas.authSchema), passportSignIn, authController.signIn);
        /**
     * @swagger
     * /api/v1/signIn:
     *      post:
     *          tags:
     *              - Auth
     *          summary: Sign in a user to the application (local)
     *          consumes:
     *              - application/json
     *          produces:
     *              - application/json
     *          parameters:
     *              - in: email
     *                name: email
     *                description: your email
     *                required: true
     *              - in: password
     *                name: password 
     *                description: your password 
     *                required: true
     *          responses:
     *              200:
     *                  description: Web token
     */
    parentRouter.get('/secret', passportJWT, authController.secret);
    /**
     * @swagger
     * /api/v1/secret:
     *   get:
     *     tags:
     *       - Auth
     *     summary: Put your jwt in authorization header for a secret message
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Web token
     */
    parentRouter.post('/facebook', passportFacebook, authController.facebookOAuth);
    /**
     * @swagger
     * /api/v1/facebook:
     *      post:
     *          tags:
     *              - Auth
     *          summary: Sign in a user to the application (facebook)
     *          consumes:
     *              - application/json
     *          produces:
     *              - application/json
     *          parameters:
     *              - in: access_token
     *                name: access_token
     *                description: access_token (graph api token => https://developers.facebook.com/tools/explorer/)
     *                required: true
     *          responses:
     *              200:
     *                  description: Web token
     */
    parentRouter.post('/forgot', authController.forgot);
    /**
     * @swagger
     * /api/v1/forgot:
     *      post:
     *          tags:
     *              - Auth
     *          summary: Sends a reset password email
     *          consumes:
     *              - application/json
     *          produces:
     *              - application/json
     *          parameters:
     *              - in: email
     *                name: email
     *                description: your email
     *                required: true
     *          responses:
     *              200:
     *                  description: Web token
     */
    parentRouter.post('/reset/:token', authController.reset);
    /**
     * @swagger
     * /api/v1/reset/:token:
     *      post:
     *          tags:
     *              - Auth
     *          summary: Reset your password
     *          consumes:
     *              - application/json
     *          produces:
     *              - application/json
     *          parameters:
     *              - in: email
     *                name: email
     *                description: your email
     *                required: true
     *          responses:
     *              200:
     *                  description: Web token
     */
};

export default initializeEndpoints;
