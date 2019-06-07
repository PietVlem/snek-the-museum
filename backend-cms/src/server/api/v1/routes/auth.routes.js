/*
Import external libraries
*/
import passport from 'passport';

/*
Import the internal libraries
*/
import { AuthController } from '../controller';
import { validateBody, schemas } from '../helpers/routeHelpers';
const passportConf = require('../service/passport.service');

/*
auth methods
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
     *   post:
     *     tags:
     *       - AUTH
     *     description: Create a user to the application
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Web token
     */
    parentRouter.post('/signIn', validateBody(schemas.authSchema), passportSignIn, authController.signIn);
    /**
     * @swagger
     * /api/v1/signIn:
     *   post:
     *     tags:
     *       - AUTH
     *     description: Sign in to the application
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Web token
     */
    parentRouter.get('/secret', passportJWT, authController.secret);
    /**
     * @swagger
     * /api/v1/scret:
     *   get:
     *     tags:
     *       - AUTH
     *     description: Get a JWT 
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
     *   post:
     *     tags:
     *       - AUTH
     *     description: Facebook login
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Web token
     */
};

export default initializeEndpoints;
