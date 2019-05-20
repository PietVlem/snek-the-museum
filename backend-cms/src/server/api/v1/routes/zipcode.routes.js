/*
Import the internal libraries:
- ZipcodeController
*/
import { ZipcodeController } from '../controller';

// Create instance of ZipcodeController otherwise you can't use it
const zipcodeController = new ZipcodeController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/zipcodes:
     *   get:
     *     tags:
     *       - Zipcodes
     *     description: Returns all zipcodes
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of zipcodes
     */
    parentRouter.get('/zipcodes', zipcodeController.index);
    /**
     * @swagger
     * /api/v1/zipcodes/create:
     *   get:
     *     tags:
     *       - Zipcode
     *     description: Returns specific viewmodel such as zipcodes
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create post
     */
    parentRouter.get('/zipcodes/create/', zipcodeController.create);
    /**
     * @swagger
     * /api/v1/zipcodes/{id}:
     *   get:
     *     tags:
     *       - Zipcode
     *     description: Returns specific post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Zipcode id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Get post by id
     */
    parentRouter.get('/zipcodes/:id', zipcodeController.show);
    /**
     * @swagger
     * /api/v1/zipcodes:
     *   post:
     *     tags:
     *       - Zipcode
     *     description: Save post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: post
     *         description: Zipcode object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved post
     */
    parentRouter.post('/zipcodes', zipcodeController.store);
    /**
     * @swagger
     * /api/v1/zipcodes/{id}/edit:
     *   get:
     *     tags:
     *       - Zipcode
     *     description: Returns specific viewmodel such as post, zipcodes
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Zipcode id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Edit zipcode by id
     */
    parentRouter.get('/zipcodes/:id/edit', zipcodeController.edit);
    /**
     * @swagger
     * /api/v1/zipcodes/{id}:
     *   put:
     *     tags:
     *       - Zipcode
     *     description: Update specific post detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Zipcode id
     *         in: path
     *         required: true
     *         type: string
     *       - name: nlog object
     *         description: zipcode data
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Update zipcode
     */
    parentRouter.put('/zipcodes/:id', zipcodeController.update);
    /**
     * @swagger
     * /api/v1/zipcodes/{id}:
     *   delete:
     *     tags:
     *       - Zipcode
     *     description: Delete specific zipcode
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Zipcode id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete zipcode
     */
    parentRouter.delete('/zipcodes/:id', zipcodeController.destroy);
};

export default initializeEndpoints;
