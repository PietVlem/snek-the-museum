/*
Import the external libraries:
- express
*/
import express from 'express';

/*
Import the internal libraries:
*/
import AuthService from '../service';
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
imageRouter(apiV1Router, authRouter);
zipcodeRouter(apiV1Router, authRouter);
exhibtionRouter(apiV1Router, authRouter);


export default apiV1Router;
