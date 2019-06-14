/*
Import the internal libraries:
- BlogController
*/
import { BlogController } from '../controller';

// Create instance of BlogController otherwise you can't use it
const blogController = new BlogController();

const initializeEndpoints = (parentRouter, authService) => {
    parentRouter.get('/blogs', blogController.index);
    /**
     * @swagger
     * /api/v1/blogs:
     *      get:
     *          tags:
     *              - Blog
     *          summary: Get all Blogs
     *          consumes:
     *              - application/json
     *          produces:
     *              - application/json
     *          responses:
     *              200:
     *                  description: Web token
     */
    parentRouter.get('/blogs/create/', blogController.create);
    /**
     * @swagger
     * /api/v1/blogs/create/:
     *      get:
     *          tags:
     *              - Blog
     *          summary: Returns specific viewmodel such as blog
     *          consumes:
     *              - application/json
     *          produces:
     *              - application/json
     *          responses:
     *              200:
     *                  description: Web token
     */
    parentRouter.get('/blogs/:id', blogController.show);
    /**
     * @swagger
     * /api/v1/blogs/{id}:
     *      get:
     *          tags:
     *              - Blog
     *          summary: Get blog with specific id
     *          consumes:
     *              - application/json
     *          produces:
     *              - application/json
     *          responses:
     *              200:
     *                  description: Web token
     */
    parentRouter.post('/blogs', blogController.store);
/**
     * @swagger
     * /api/v1/blogs:
     *      post:
     *          tags:
     *              - Blog
     *          summary: create a blog
     *          consumes:
     *              - application/json
     *          produces:
     *              - application/json
     *          parameters:
     *              - in: title
     *                name: title
     *                description: blog title
     *                required: true
     *              - in: synopsis
     *                name: synopsis
     *                description: blog synopsis
     *                required: true
     *              - in: body
     *                name: body
     *                description: blog body
     *                required: true
     *          responses:
     *              200:
     *                  description: Web token
     */
    parentRouter.get('/blogs/:id/edit', blogController.edit);
    /**
     * @swagger
     * /api/v1/blogs/:id/edit:
     *      get:
     *          tags:
     *              - Blog
     *          summary: Returns specific viewmodel such as blog
     *          consumes:
     *              - application/json
     *          produces:
     *              - application/json
     *          responses:
     *              200:
     *                  description: Web token
     */
    parentRouter.put('/blogs/:id', blogController.update);
    /**
     * @swagger
     * /api/v1/blogs/{id}:
     *   delete:
     *     tags:
     *       - Blog
     *     description: Delete specific blog
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Blog id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete blog
     */
    parentRouter.delete('/blogs/:id', blogController.destroy);
};

export default initializeEndpoints;
