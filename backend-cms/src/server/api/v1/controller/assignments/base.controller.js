/*
Import the external libraries:
- uuidv4
*/

/*
Import the internal libraries:
- * from database
- errorHandler
*/
import { Base } from '../../database';
import { APIError, handleAPIError } from '../../../../utilities';

class BaseController {
    // List all the models
    index = async (req, res, next) => {
        try {
            const { limit, skip } = req.query;
            let bases = null;
            if (limit && skip) {
                const options = {
                    page: parseInt(skip, 10) || 1,
                    limit: parseInt(limit, 10) || 10,
                    populate: 'exhibition',
                    sort: { created_at: -1 },
                };
                bases = await Base.paginate({}, options);
            } else {
                bases = await Base.find().populate('exhibition').sort({ created_at: -1 }).exec();
            }

            if (bases === undefined || bases === null) {
                throw new APIError(404, 'Collection for bases not found!');
            }
            return res.status(200).json(bases);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving bases', next);
        }
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await Base.findById(id).populate('category').exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `Base with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving bases', next);
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
            const baseCreate = new Base({
                exhibitionId : res.body.exhibitionId,
                base: req.body.base,
                posibilities: req.body.posibilities,
                answer: req.body.answer
            });
            const base = await baseCreate.save();
            return res.status(201).json(base);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the Base!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const { id } = req.params;

        try {
            const base = await Base.findById(id).exec();

            if (!base) {
                throw new APIError(404, `Base with id: ${id} not found!`);
            } else {
                const vm = {
                    base,
                    categories: [],
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Base with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const { id } = req.params;

        try {
            const baseUpdate = req.body;
            const base = await Base.findOneAndUpdate({ _id: id }, baseUpdate, { new: true }).exec();

            if (!base) {
                throw new APIError(404, `Base with id: ${id} not found!`);
            }
            return res.status(200).json(base);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Base with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const { id } = req.params;

        try {
            let base = null;

            let { mode } = req.query;
            if (mode) {
                base = await Base.findByIdAndUpdate({ _id: id }, { deleted_at: (mode === 'softdelete' ? Date.now() : null) }, { new: true });
            } else {
                mode = 'delete';
                base = await Base.findOneAndRemove({ _id: id });
            }

            if (!base) {
                throw new APIError(404, `Base with id: ${id} not found!`);
            } else {
                return res.status(200).json({ message: `Successful deleted the Base with id: ${id}!`, base, mode });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Base with id: ${id}!`, next);
        }
    }
}

export default BaseController;
