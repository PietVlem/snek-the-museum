/*
Import external libraries
*/
import passport from 'passport';

/*
Import the internal libraries
*/
import { AuthController } from '../controller';
import { validateBody, schemas } from '../helpers/routeHelpers';
const passportConf = require('../service/passport');

// Create instance of AuthController otherwise you can't use it
const authController = new AuthController();

const initializeEndpoints = (parentRouter, authService) => {
    parentRouter.post('/login/local', (req, res, next) => authController.loginLocal(authService, req, res, next));

    parentRouter.post('/signIn', authController.signIn);
    parentRouter.post('/signUp', validateBody(schemas.authSchema), authController.signUp);
    parentRouter.get('/secret', passport.authenticate('jwt', { session: false }), authController.secret);
};

export default initializeEndpoints;
