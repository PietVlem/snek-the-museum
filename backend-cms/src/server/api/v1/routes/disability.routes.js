/*
Import the internal libraries:
- DisabilityController
*/
import { DisabilityController } from '../controller';

// Create instance of DisabilityController otherwise you can't use it
const disabilityController = new DisabilityController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/disabilities:
     *   get:
     *     tags:
     *       - Disabilities
     *     description: Returns all disabilities
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of disabilities
     */
    parentRouter.get('/disabilities', disabilityController.index);
    /**
     * @swagger
     * /api/v1/disabilities/create:
     *   get:
     *     tags:
     *       - Disability
     *     description: Returns specific viewmodel such as disabilities
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create post
     */
    parentRouter.get('/disabilities/create/', disabilityController.create);
    /**
     * @swagger
     * /api/v1/disabilities/{id}:
     *   get:
     *     tags:
     *       - Disability
     *     description: Returns specific post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Disability id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Get post by id
     */
    parentRouter.get('/disabilities/:id', disabilityController.show);
    /**
     * @swagger
     * /api/v1/disabilities:
     *   post:
     *     tags:
     *       - Disability
     *     description: Save post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: post
     *         description: Disability object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved post
     */
    parentRouter.post('/disabilities', disabilityController.store);
    /**
     * @swagger
     * /api/v1/disabilities/{id}/edit:
     *   get:
     *     tags:
     *       - Disability
     *     description: Returns specific viewmodel such as post, disabilities
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Disability id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Edit disability by id
     */
    parentRouter.get('/disabilities/:id/edit', disabilityController.edit);
    /**
     * @swagger
     * /api/v1/disabilities/{id}:
     *   put:
     *     tags:
     *       - Disability
     *     description: Update specific post detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Disability id
     *         in: path
     *         required: true
     *         type: string
     *       - name: nlog object
     *         description: disability data
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Update disability
     */
    parentRouter.put('/disabilities/:id', disabilityController.update);
    /**
     * @swagger
     * /api/v1/disabilities/{id}:
     *   delete:
     *     tags:
     *       - Disability
     *     description: Delete specific disability
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Disability id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete disability
     */
    parentRouter.delete('/disabilities/:id', disabilityController.destroy);
};

export default initializeEndpoints;
