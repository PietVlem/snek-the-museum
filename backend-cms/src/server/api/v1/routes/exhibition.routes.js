/*
Import the internal libraries:
- ExhibitionController
*/
import { ExhibitionController } from '../controller';

// Create instance of ExhibitionController otherwise you can't use it
const exhibitionController = new ExhibitionController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/exhibitions:
     *   get:
     *     tags:
     *       - Exhibitions
     *     description: Returns all exhibitions
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of exhibitions
     */
    parentRouter.get('/exhibitions', exhibitionController.index);
    /**
     * @swagger
     * /api/v1/exhibitions/create:
     *   get:
     *     tags:
     *       - Exhibition
     *     description: Returns specific viewmodel such as exhibitions
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create post
     */
    parentRouter.get('/exhibitions/create/', exhibitionController.create);
    /**
     * @swagger
     * /api/v1/exhibitions/{id}:
     *   get:
     *     tags:
     *       - Exhibition
     *     description: Returns specific post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Exhibition id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Get post by id
     */
    parentRouter.get('/exhibitions/:id', exhibitionController.show);
    /**
     * @swagger
     * /api/v1/exhibitions:
     *   post:
     *     tags:
     *       - Exhibition
     *     description: Save post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: post
     *         description: Exhibition object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved post
     */
    parentRouter.post('/exhibitions', exhibitionController.store);
    /**
     * @swagger
     * /api/v1/exhibitions/{id}/edit:
     *   get:
     *     tags:
     *       - Exhibition
     *     description: Returns specific viewmodel such as post, exhibitions
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Exhibition id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Edit exhibition by id
     */
    parentRouter.get('/exhibitions/:id/edit', exhibitionController.edit);
    /**
     * @swagger
     * /api/v1/exhibitions/{id}:
     *   put:
     *     tags:
     *       - Exhibition
     *     description: Update specific post detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Exhibition id
     *         in: path
     *         required: true
     *         type: string
     *       - name: nlog object
     *         description: exhibition data
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Update exhibition
     */
    parentRouter.put('/exhibitions/:id', exhibitionController.update);
    /**
     * @swagger
     * /api/v1/exhibitions/{id}:
     *   delete:
     *     tags:
     *       - Exhibition
     *     description: Delete specific exhibition
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Exhibition id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete exhibition
     */
    parentRouter.delete('/exhibitions/:id', exhibitionController.destroy);
};

export default initializeEndpoints;
