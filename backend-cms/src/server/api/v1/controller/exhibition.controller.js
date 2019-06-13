/*
Import the external libraries:
- uuidv4
*/

/*
Import the internal libraries:
- * from database
- errorHandler
*/
import { Exhibition } from '../database';
import { APIError, handleAPIError } from '../../../utilities';

class ExhibitionController {
    // List all the models
    index = async (req, res, next) => {
        try {
            const { limit, skip } = req.query;
            let exhibitions = null;
            if (limit && skip) {
                const options = {
                    page: parseInt(skip, 10) || 1,
                    limit: parseInt(limit, 10) || 10,
                    sort: { created_at: -1 },
                };
                exhibitions = await Exhibition.paginate({}, options);
            } else {
                exhibitions = await Exhibition.find().populate('eImage').sort({ created_at: -1 }).exec();
            }

            if (exhibitions === undefined || exhibitions === null) {
                throw new APIError(404, 'Collection for exhibitions not found!');
            }
            return res.status(200).json(exhibitions);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving exhibitions', next);
        }
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await Exhibition.findById(id).populate('reactions').populate('eImage').populate('exhibitionGallery').exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `Exhibition with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving exhibitions', next);
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
            const exhibitionCreate = new Exhibition({
                name: req.body.name,
                exhibitionImage: req.body.exhibitionImage,
                info: req.body.info,
                price: req.body.price,
                duration: req.body.duration,
                promocode: req.body.promocode,
                museumId: req.body.museumId
            });
            const exhibition = await exhibitionCreate.save();
            return res.status(201).json(exhibition);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the exhibition!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const { id } = req.params;

        try {
            const exhibition = await Exhibition.findById(id).exec();

            if (!exhibition) {
                throw new APIError(404, `Exhibition with id: ${id} not found!`);
            } else {
                const vm = {
                    exhibition,
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Exhibition with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const { id } = req.params;

        try {
            const exhibitionUpdate = req.body;
            const exhibition = await Exhibition.findOneAndUpdate({ _id: id }, exhibitionUpdate, { new: true }).exec();

            if (!exhibition) {
                throw new APIError(404, `Exhibition with id: ${id} not found!`);
            }
            return res.status(200).json(exhibition);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Exhibition with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const { id } = req.params;

        try {
            let exhibition = null;

            let { mode } = req.query;
            if (mode) {
                exhibition = await Exhibition.findByIdAndUpdate({ _id: id }, { deleted_at: (mode === 'softdelete' ? Date.now() : null) }, { new: true });
            } else {
                mode = 'delete';
                exhibition = await Exhibition.findOneAndRemove({ _id: id });
            }

            if (!exhibition) {
                throw new APIError(404, `Exhibition with id: ${id} not found!`);
            } else {
                return res.status(200).json({ message: `Successful deleted the Exhibition with id: ${id}!`, exhibition, mode });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Exhibition with id: ${id}!`, next);
        }
    }
}

export default ExhibitionController;
