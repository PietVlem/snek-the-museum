/*
Import the external libraries:
- uuidv4
*/

/*
Import the internal libraries:
- * from database
- errorHandler
*/
import { Disability } from '../database';
import { APIError, handleAPIError } from '../../../utilities';

class DisabilityController {
    // List all the models
    index = async (req, res, next) => {
        try {
            const { limit, skip } = req.query;
            let disabilities = null;
            if (limit && skip) {
                const options = {
                    page: parseInt(skip, 10) || 1,
                    limit: parseInt(limit, 10) || 10,
                    sort: { created_at: -1 },
                };
                disabilities = await Disability.paginate({}, options);
            } else {
                disabilities = await Disability.find().populate('category').sort({ created_at: -1 }).exec();
            }

            if (disabilities === undefined || disabilities === null) {
                throw new APIError(404, 'Collection for disabilities not found!');
            }
            return res.status(200).json(disabilities);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving disabilities', next);
        }
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await Disability.findById(id).populate('category').exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `Disability with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving disabilities', next);
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
            const disabilityCreate = new Disability({
                name: req.body.name,
            });
            const disability = await disabilityCreate.save();
            return res.status(201).json(disability);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the disability!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const { id } = req.params;

        try {
            const disability = await Disability.findById(id).exec();

            if (!disability) {
                throw new APIError(404, `Disability with id: ${id} not found!`);
            } else {
                const vm = {
                    disability,
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Disability with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const { id } = req.params;

        try {
            const disabilityUpdate = req.body;
            const disability = await Disability.findOneAndUpdate({ _id: id }, disabilityUpdate, { new: true }).exec();

            if (!disability) {
                throw new APIError(404, `Disability with id: ${id} not found!`);
            }
            return res.status(200).json(disability);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Disability with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const { id } = req.params;

        try {
            let disability = null;

            let { mode } = req.query;
            if (mode) {
                disability = await Disability.findByIdAndUpdate({ _id: id }, { deleted_at: (mode === 'softdelete' ? Date.now() : null) }, { new: true });
            } else {
                mode = 'delete';
                disability = await Disability.findOneAndRemove({ _id: id });
            }

            if (!disability) {
                throw new APIError(404, `Disability with id: ${id} not found!`);
            } else {
                return res.status(200).json({ message: `Successful deleted the Disability with id: ${id}!`, disability, mode });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Disability with id: ${id}!`, next);
        }
    }
}

export default DisabilityController;
