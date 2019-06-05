/*
Import the external libraries:
- uuidv4
*/

/*
Import the internal libraries:
- * from database
- errorHandler
*/
import { Photo } from '../database';
import { APIError, handleAPIError } from '../../../utilities';

class PhotoController {
    // List all the models
    index = async (req, res, next) => {
        try {
            const { limit, skip } = req.query;
            let photos = null;
            if (limit && skip) {
                const options = {
                    page: parseInt(skip, 10) || 1,
                    limit: parseInt(limit, 10) || 10,
                    sort: { created_at: -1 },
                };
                photos = await Photo.paginate({}, options);
            } else {
                photos = await Photo.find().sort({ created_at: -1 }).exec();
            }

            if (photos === undefined || photos === null) {
                throw new APIError(404, 'Collection for photos not found!');
            }
            return res.status(200).json(photos);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving photos', next);
        }
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await Photo.findById(id).populate('category').exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `Photo with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving photos', next);
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
            const photoCreate = new Photo({
                title: req.body.title,
                body: req.body.body,
                categoryId: req.body.categoryId
            });
            const photo = await photoCreate.save();
            return res.status(201).json(photo);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the Photo!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const { id } = req.params;

        try {
            const photo = await Photo.findById(id).exec();

            if (!photo) {
                throw new APIError(404, `Photo with id: ${id} not found!`);
            } else {
                const vm = {
                    photo,
                    categories: [],
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Photo with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const { id } = req.params;

        try {
            const photoUpdate = req.body;
            const photo = await Photo.findOneAndUpdate({ _id: id }, photoUpdate, { new: true }).exec();

            if (!photo) {
                throw new APIError(404, `Photo with id: ${id} not found!`);
            }
            return res.status(200).json(photo);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Photo with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const { id } = req.params;

        try {
            let photo = null;

            let { mode } = req.query;
            if (mode) {
                photo = await Photo.findByIdAndUpdate({ _id: id }, { deleted_at: (mode === 'softdelete' ? Date.now() : null) }, { new: true });
            } else {
                mode = 'delete';
                photo = await Photo.findOneAndRemove({ _id: id });
            }

            if (!photo) {
                throw new APIError(404, `Photo with id: ${id} not found!`);
            } else {
                return res.status(200).json({ message: `Successful deleted the Photo with id: ${id}!`, photo, mode });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Photo with id: ${id}!`, next);
        }
    }
}

export default PhotoController;
