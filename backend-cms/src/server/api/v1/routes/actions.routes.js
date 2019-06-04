/*
Import the internal libraries:
- ActionController
*/
import { ActionController } from '../controller';

// Create instance of ActionController otherwise you can't use it
const actionController = new ActionController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/actions:
     *   get:
     *     tags:
     *       - Actions
     *     description: Returns all actions
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of actions
     */
    parentRouter.get('/actions', actionController.index);
    /**
     * @swagger
     * /api/v1/actions/create:
     *   get:
     *     tags:
     *       - Action
     *     description: Returns specific viewmodel such as actions
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create post
     */
    parentRouter.get('/actions/create/', actionController.create);
    /**
     * @swagger
     * /api/v1/actions/{id}:
     *   get:
     *     tags:
     *       - Action
     *     description: Returns specific post
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
     *         description: Get post by id
     */
    parentRouter.get('/actions/:id', actionController.show);
    /**
     * @swagger
     * /api/v1/actions:
     *   post:
     *     tags:
     *       - Action
     *     description: Save post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: post
     *         description: Action object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved post
     */
    parentRouter.post('/actions', actionController.store);
    /**
     * @swagger
     * /api/v1/actions/{id}/edit:
     *   get:
     *     tags:
     *       - Action
     *     description: Returns specific viewmodel such as post, actions
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
    parentRouter.get('/actions/:id/edit', actionController.edit);
    /**
     * @swagger
     * /api/v1/actions/{id}:
     *   put:
     *     tags:
     *       - Action
     *     description: Update specific post detail
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
    parentRouter.put('/actions/:id', actionController.update);
    /**
     * @swagger
     * /api/v1/actions/{id}:
     *   delete:
     *     tags:
     *       - Action
     *     description: Delete specific action
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
    parentRouter.delete('/actions/:id', actionController.destroy);
};

export default initializeEndpoints;
