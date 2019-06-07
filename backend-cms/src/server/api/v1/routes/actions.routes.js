/*
Import external libraries:
*/
import passport from 'passport';

/*
Import the internal libraries:
*/
import { ActionController } from '../controller';

/* 
Create instance of ActionController otherwise you can't use it 
*/
const actionController = new ActionController();

/* 
Passport authentication option(s)
*/
const passportJWT = passport.authenticate('jwt', { session: false });

const initializeEndpoints = (parentRouter, authService) => {
    parentRouter.get('/actions', passportJWT ,actionController.index);
    /**
     * @swagger
     * /api/v1/actions:
     *   get:
     *     tags:
     *       - Actions
     *     summary: Returns all actions
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of actions
     */
    parentRouter.get('/actions/create/', passportJWT, actionController.create);
    /**
     * @swagger
     * /api/v1/actions/create:
     *   get:
     *     tags:
     *       - Action
     *     summary: create an action
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: action created
     */
    parentRouter.get('/actions/:id', passportJWT, actionController.show);
    /**
     * @swagger
     * /api/v1/actions/{id}:
     *   get:
     *     tags:
     *       - Action
     *     summary: Returns specific action
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Get action by id
     */
    parentRouter.post('/actions', passportJWT, actionController.store);
    /**
     * @swagger
     * /api/v1/actions:
     *   post:
     *     tags:
     *       - Action
     *     summary: Save action
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: post
     *         description: Action object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved action
     */
    parentRouter.get('/actions/:id/edit', passportJWT, actionController.edit);
    /**
     * @swagger
     * /api/v1/actions/{id}/edit:
     *   get:
     *     tags:
     *       - Action
     *     summary: Returns specific viewmodel such as action, actions
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Action id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Edit action by id
     */
    parentRouter.put('/actions/:id', passportJWT, actionController.update);
    /**
     * @swagger
     * /api/v1/actions/{id}:
     *   put:
     *     tags:
     *       - Action
     *     summary: Update specific action detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Action id
     *         in: path
     *         required: true
     *         type: string
     *       - name: nlog object
     *         description: action data
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Update action
     */
    parentRouter.delete('/actions/:id', passportJWT, actionController.destroy);
    /**
     * @swagger
     * /api/v1/actions/{id}:
     *   delete:
     *     tags:
     *       - Action
     *     summary: Delete specific action
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Action id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete action
     */

};

export default initializeEndpoints;
