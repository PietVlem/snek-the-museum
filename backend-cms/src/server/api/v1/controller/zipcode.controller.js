/*
Import the external libraries:
- uuidv4
*/

/*
Import the internal libraries:
- * from database
- errorHandler
*/
import { Zipcode } from '../database';
import { APIError, handleAPIError } from '../../../utilities';

class ZipcodeController {
    // List all the models
    index = async (req, res, next) => {
        try {
            const { limit, skip } = req.query;
            let zipcodes = null;
            if (limit && skip) {
                const options = {
                    page: parseInt(skip, 10) || 1,
                    limit: parseInt(limit, 10) || 10,
                    sort: { created_at: -1 },
                };
                zipcodes = await Zipcode.paginate({}, options);
            } else {
                zipcodes = await Zipcode.find().populate('category').sort({ created_at: -1 }).exec();
            }

            if (zipcodes === undefined || zipcodes === null) {
                throw new APIError(404, 'Collection for zipcodes not found!');
            }
            return res.status(200).json(zipcodes);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving zipcodes', next);
        }
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await Zipcode.findById(id).populate('category').exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `Zipcode with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving zipcodes', next);
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
            const zipcodeCreate = new Zipcode({
                title: req.body.title,
                body: req.body.body,
                categoryId: req.body.categoryId
            });
            const zipcode = await zipcodeCreate.save();
            return res.status(201).json(zipcode);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the Zipcode!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const { id } = req.params;

        try {
            const zipcode = await Zipcode.findById(id).exec();

            if (!zipcode) {
                throw new APIError(404, `Zipcode with id: ${id} not found!`);
            } else {
                const vm = {
                    zipcode,
                    categories: [],
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Zipcode with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const { id } = req.params;

        try {
            const zipcodeUpdate = req.body;
            const zipcode = await Zipcode.findOneAndUpdate({ _id: id }, zipcodeUpdate, { new: true }).exec();

            if (!zipcode) {
                throw new APIError(404, `Zipcode with id: ${id} not found!`);
            }
            return res.status(200).json(zipcode);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Zipcode with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const { id } = req.params;

        try {
            let zipcode = null;

            let { mode } = req.query;
            if (mode) {
                zipcode = await Zipcode.findByIdAndUpdate({ _id: id }, { deleted_at: (mode === 'softdelete' ? Date.now() : null) }, { new: true });
            } else {
                mode = 'delete';
                zipcode = await Zipcode.findOneAndRemove({ _id: id });
            }

            if (!zipcode) {
                throw new APIError(404, `Zipcode with id: ${id} not found!`);
            } else {
                return res.status(200).json({ message: `Successful deleted the Zipcode with id: ${id}!`, zipcode, mode });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Zipcode with id: ${id}!`, next);
        }
    }
}

export default ZipcodeController;
