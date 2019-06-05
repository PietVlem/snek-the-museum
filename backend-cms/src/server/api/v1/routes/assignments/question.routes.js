/*
Import the internal libraries:
- QuestionController
*/
import { QuestionController } from '../../controller';

// Create instance of QuestionController otherwise you can't use it
const questionController = new QuestionController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/questions:
     *   get:
     *     tags:
     *       - Questions
     *     description: Returns all questions
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of questions
     */
    parentRouter.get('/questions', questionController.index);
    /**
     * @swagger
     * /api/v1/questions/create:
     *   get:
     *     tags:
     *       - Question
     *     description: Returns specific viewmodel such as questions
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create post
     */
    parentRouter.get('/questions/create/', questionController.create);
    /**
     * @swagger
     * /api/v1/questions/{id}:
     *   get:
     *     tags:
     *       - Question
     *     description: Returns specific post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Question id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Get post by id
     */
    parentRouter.get('/questions/:id', questionController.show);
    /**
     * @swagger
     * /api/v1/questions:
     *   post:
     *     tags:
     *       - Question
     *     description: Save post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: post
     *         description: Question object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved post
     */
    parentRouter.post('/questions', questionController.store);
    /**
     * @swagger
     * /api/v1/questions/{id}/edit:
     *   get:
     *     tags:
     *       - Question
     *     description: Returns specific viewmodel such as post, questions
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Question id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Edit question by id
     */
    parentRouter.get('/questions/:id/edit', questionController.edit);
    /**
     * @swagger
     * /api/v1/questions/{id}:
     *   put:
     *     tags:
     *       - Question
     *     description: Update specific post detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Question id
     *         in: path
     *         required: true
     *         type: string
     *       - name: nlog object
     *         description: question data
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Update question
     */
    parentRouter.put('/questions/:id', questionController.update);
    /**
     * @swagger
     * /api/v1/questions/{id}:
     *   delete:
     *     tags:
     *       - Question
     *     description: Delete specific question
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Question id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete question
     */
    parentRouter.delete('/questions/:id', questionController.destroy);
};

export default initializeEndpoints;
