/*
Import the internal libraries:
- MuseumController
*/
import { MuseumController } from '../controller';

// Create instance of MuseumController otherwise you can't use it
const museumController = new MuseumController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/museums:
     *   get:
     *     tags:
     *       - Museums
     *     description: Returns all museums
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of museums
     */
    parentRouter.get('/museums', museumController.index);
    /**
     * @swagger
     * /api/v1/museums/create:
     *   get:
     *     tags:
     *       - Museum
     *     description: Returns specific viewmodel such as categories
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create museum
     */
    parentRouter.get('/museums/create/', museumController.create);
    /**
     * @swagger
     * /api/v1/museums/{id}:
     *   get:
     *     tags:
     *       - Museum
     *     description: Returns specific museum
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Museum id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Get museum by id
     */
    parentRouter.get('/museums/:id', museumController.show);
    /**
     * @swagger
     * /api/v1/museums:
     *   museum:
     *     tags:
     *       - Museum
     *     description: Save museum
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: museum
     *         description: Museum object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved museum
     */
    parentRouter.post('/museums', museumController.store);
    /**
     * @swagger
     * /api/v1/museums/{id}/edit:
     *   get:
     *     tags:
     *       - Museum
     *     description: Returns specific viewmodel such as museum, categories
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Museum id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Edit museum by id
     */
    parentRouter.get('/museums/:id/edit', museumController.edit);
    /**
     * @swagger
     * /api/v1/museums/{id}:
     *   put:
     *     tags:
     *       - Museum
     *     description: Update specific museum detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Museum id
     *         in: path
     *         required: true
     *         type: string
     *       - name: museum object
     *         description: museum data
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Update museum
     */
    parentRouter.put('/museums/:id', museumController.update);
    /**
     * @swagger
     * /api/v1/museums/{id}:
     *   delete:
     *     tags:
     *       - Museum
     *     description: Delete specific museum detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Museum id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete museum
     */
    parentRouter.delete('/museums/:id', museumController.destroy);
};

export default initializeEndpoints;
