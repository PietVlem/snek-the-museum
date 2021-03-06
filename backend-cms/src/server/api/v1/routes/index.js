/*
Import the external libraries:
- express
*/
import express from 'express';

/*
Import the internal libraries:
*/
// Services
import AuthService from '../service';

// Routers
import authRouter from './auth.routes';
import blogRouter from './blog.routes';
import categoryRouter from './category.routes';
import postRouter from './post.routes';
import userRouter from './user.routes';
import museumRouter from './museum.routes';
import disabilityRouter from './disability.routes';
import imageRouter from './image.routes';
import zipcodeRouter from './zipcode.routes';
import exhibtionRouter from './exhibition.routes';
import baseRouter from './assignments/base.routes';
import questionsRouter from './assignments/question.routes';
import actionRouter from './actions.routes';
import reactionRouter from './reaction.routes';

// Initialize the AuthService
const authService = new AuthService();

// Define and initiate an express router
const apiV1Router = express.Router();
authRouter(apiV1Router, authService);
blogRouter(apiV1Router, authService);
categoryRouter(apiV1Router, authService);
postRouter(apiV1Router, authService);
userRouter(apiV1Router, authService);
museumRouter(apiV1Router, authService);
disabilityRouter(apiV1Router, authService);
imageRouter(apiV1Router, authService);
zipcodeRouter(apiV1Router, authService);
exhibtionRouter(apiV1Router, authService);
baseRouter(apiV1Router, authService);
questionsRouter(apiV1Router, authService);
actionRouter(apiV1Router, authService);
reactionRouter(apiV1Router, authService);

export default apiV1Router;
