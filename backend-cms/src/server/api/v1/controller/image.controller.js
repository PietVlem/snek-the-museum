/*
Import the external libraries:
- uuidv4
*/

/*
Import the internal libraries:
- * from database
- errorHandler
*/
import { Image } from '../database';
import { APIError, handleAPIError } from '../../../utilities';

class ImageController {
    // List all the models
    index = async (req, res, next) => {
        try {
            const { limit, skip } = req.query;
            let images = null;
            if (limit && skip) {
                const options = {
                    page: parseInt(skip, 10) || 1,
                    limit: parseInt(limit, 10) || 10,
                    sort: { created_at: -1 },
                };
                images = await Image.paginate({}, options);
            } else {
                images = await Image.find().populate('category').sort({ created_at: -1 }).exec();
            }

            if (images === undefined || images === null) {
                throw new APIError(404, 'Collection for images not found!');
            }
            return res.status(200).json(images);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving images', next);
        }
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await Image.findById(id).populate('category').exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `Image with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving images', next);
        }
    }

    // ViewModel for Insert / Create
    create = (req, res) => {
        const vm = {
            categories: [],
        };
        return res.status(200).json(vm);
    }

    // Store / Create the new model
    store = async (req, res, next) => {
        try {
            const imageCreate = new Image({
                title: req.body.title,
                body: req.body.body,
                categoryId: req.body.categoryId
            });
            const image = await imageCreate.save();
            return res.status(201).json(image);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the Image!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const { id } = req.params;

        try {
            const image = await Image.findById(id).exec();

            if (!image) {
                throw new APIError(404, `Image with id: ${id} not found!`);
            } else {
                const vm = {
                    image,
                    categories: [],
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Image with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const { id } = req.params;

        try {
            const imageUpdate = req.body;
            const image = await Image.findOneAndUpdate({ _id: id }, imageUpdate, { new: true }).exec();

            if (!image) {
                throw new APIError(404, `Image with id: ${id} not found!`);
            }
            return res.status(200).json(image);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Image with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const { id } = req.params;

        try {
            let image = null;

            let { mode } = req.query;
            if (mode) {
                image = await Image.findByIdAndUpdate({ _id: id }, { deleted_at: (mode === 'softdelete' ? Date.now() : null) }, { new: true });
            } else {
                mode = 'delete';
                image = await Image.findOneAndRemove({ _id: id });
            }

            if (!image) {
                throw new APIError(404, `Image with id: ${id} not found!`);
            } else {
                return res.status(200).json({ message: `Successful deleted the Image with id: ${id}!`, image, mode });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Image with id: ${id}!`, next);
        }
    }
}

export default ImageController;
