/*
Import the internal libraries:
- ReactionController
*/
import { ReactionController } from '../controller';

// Create instance of ReactionController otherwise you can't use it
const reactionController = new ReactionController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/reactions:
     *   get:
     *     tags:
     *       - Reactions
     *     description: Returns all reactions
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of reactions
     */
    parentRouter.get('/reactions', reactionController.index);
    /**
     * @swagger
     * /api/v1/reactions/create:
     *   get:
     *     tags:
     *       - Reaction
     *     description: Returns specific viewmodel such as categories
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create reaction
     */
    parentRouter.get('/reactions/create/', reactionController.create);
    /**
     * @swagger
     * /api/v1/reactions/{id}:
     *   get:
     *     tags:
     *       - Reaction
     *     description: Returns specific reaction
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Reaction id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Get reaction by id
     */
    parentRouter.get('/reactions/:id', reactionController.show);
    /**
     * @swagger
     * /api/v1/reactions:
     *   reaction:
     *     tags:
     *       - Reaction
     *     description: Save reaction
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: reaction
     *         description: Reaction object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved reaction
     */
    parentRouter.post('/reactions', reactionController.store);
    /**
     * @swagger
     * /api/v1/reactions/{id}/edit:
     *   get:
     *     tags:
     *       - Reaction
     *     description: Returns specific viewmodel such as reaction, categories
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Reaction id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Edit reaction by id
     */
    parentRouter.get('/reactions/:id/edit', reactionController.edit);
    /**
     * @swagger
     * /api/v1/reactions/{id}:
     *   put:
     *     tags:
     *       - Reaction
     *     description: Update specific reaction detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Reaction id
     *         in: path
     *         required: true
     *         type: string
     *       - name: reaction object
     *         description: reaction data
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Update reaction
     */
    parentRouter.put('/reactions/:id', reactionController.update);
    /**
     * @swagger
     * /api/v1/reactions/{id}:
     *   delete:
     *     tags:
     *       - Reaction
     *     description: Delete specific reaction detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Reaction id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete reaction
     */
    parentRouter.delete('/reactions/:id', reactionController.destroy);

};

export default initializeEndpoints;
