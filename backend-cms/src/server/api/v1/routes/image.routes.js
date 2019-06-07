/*
Import the internal libraries:
- ImageController
*/
import { ImageController } from '../controller';

// Create instance of ImageController otherwise you can't use it
const imageController = new ImageController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/images:
     *   get:
     *     tags:
     *       - Images
     *     description: Returns all images
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of images
     */
    parentRouter.get('/images', imageController.index);
    /**
     * @swagger
     * /api/v1/images/create:
     *   get:
     *     tags:
     *       - Image
     *     description: Returns specific viewmodel such as images
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create post
     */
    parentRouter.get('/images/create', imageController.create);
    /**
     * @swagger
     * /api/v1/images/{id}:
     *   get:
     *     tags:
     *       - Image
     *     description: Returns specific post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Image id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Get post by id
     */
    parentRouter.get('/images/:id', imageController.show);
    /**
     * @swagger
     * /api/v1/images:
     *   post:
     *     tags:
     *       - Image
     *     description: Save post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: post
     *         description: Image object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved post
     */
    parentRouter.post('/images', imageController.store);
    /**
     * @swagger
     * /api/v1/images/{id}/edit:
     *   get:
     *     tags:
     *       - Image
     *     description: Returns specific viewmodel such as post, images
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Image id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Edit image by id
     */
    parentRouter.get('/images/:id/edit', imageController.edit);
    /**
     * @swagger
     * /api/v1/images/{id}:
     *   put:
     *     tags:
     *       - Image
     *     description: Update specific post detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Image id
     *         in: path
     *         required: true
     *         type: string
     *       - name: nlog object
     *         description: image data
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Update image
     */
    parentRouter.put('/images/:id', imageController.update);
    /**
     * @swagger
     * /api/v1/images/{id}:
     *   delete:
     *     tags:
     *       - Image
     *     description: Delete specific image
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Image id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete image
     */
    parentRouter.delete('/images/:id', imageController.destroy);
};

export default initializeEndpoints;
