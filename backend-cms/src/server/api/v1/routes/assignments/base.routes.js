/*
Import the internal libraries:
- BaseController
*/
import { BaseController } from '../../controller';

// Create instance of BaseController otherwise you can't use it
const baseController = new BaseController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/bases:
     *   get:
     *     tags:
     *       - Bases
     *     description: Returns all bases
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of bases
     */
    parentRouter.get('/bases', baseController.index);
    /**
     * @swagger
     * /api/v1/bases/create:
     *   get:
     *     tags:
     *       - Base
     *     description: Returns specific viewmodel such as bases
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create post
     */
    parentRouter.get('/bases/:id', baseController.show);
    /**
     * @swagger
     * /api/v1/bases:
     *   post:
     *     tags:
     *       - Base
     *     description: Save post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: post
     *         description: Base object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved post
     */
    parentRouter.post('/bases', baseController.store);
    /**
     * @swagger
     * /api/v1/bases/{id}/edit:
     *   get:
     *     tags:
     *       - Base
     *     description: Returns specific viewmodel such as post, bases
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Base id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Edit base by id
     */
    parentRouter.get('/bases/:id/edit', baseController.edit);
    /**
     * @swagger
     * /api/v1/bases/{id}:
     *   put:
     *     tags:
     *       - Base
     *     description: Update specific post detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Base id
     *         in: path
     *         required: true
     *         type: string
     *       - name: nlog object
     *         description: base data
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Update base
     */
    parentRouter.put('/bases/:id', baseController.update);
    /**
     * @swagger
     * /api/v1/bases/{id}:
     *   delete:
     *     tags:
     *       - Base
     *     description: Delete specific base
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Base id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete base
     */
    parentRouter.delete('/bases/:id', baseController.destroy);
};

export default initializeEndpoints;
