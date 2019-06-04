/*
Import the external libraries:
- uuidv4
*/

/*
Import the internal libraries:
- * from database
- errorHandler
*/
import { Action } from '../database';
import { APIError, handleAPIError } from '../../../utilities';

class ActionController {
    // List all the models
    index = async (req, res, next) => {
        try {
            const { limit, skip } = req.query;
            let actions = null;
            if (limit && skip) {
                const options = {
                    page: parseInt(skip, 10) || 1,
                    limit: parseInt(limit, 10) || 10,
                    populate: 'user',
                    populate: 'assignment',
                    sort: { created_at: -1 },
                };
                actions = await Action.paginate({}, options);
            } else {
                actions = await Action.find().populate('user').populate('assignment').sort({ created_at: -1 }).exec();
            }

            if (actions === undefined || actions === null) {
                throw new APIError(404, 'Collection for actions not found!');
            }
            return res.status(200).json(actions);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving actions', next);
        }
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await Action.findById(id).populate('category').exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `Action with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving actions', next);
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
            const actionCreate = new Action({
                userId: req.body.userId,
                assignmentId: req.body.assignmentId,
                completed: req.body.completed,
                successful: req.body.successful
            });
            const action = await actionCreate.save();
            return res.status(201).json(action);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the action!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const { id } = req.params;

        try {
            const action = await Action.findById(id).exec();

            if (!action) {
                throw new APIError(404, `Action with id: ${id} not found!`);
            } else {
                const vm = {
                    action,
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Action with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const { id } = req.params;

        try {
            const actionUpdate = req.body;
            const action = await Action.findOneAndUpdate({ _id: id }, actionUpdate, { new: true }).exec();

            if (!action) {
                throw new APIError(404, `Action with id: ${id} not found!`);
            }
            return res.status(200).json(action);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Action with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const { id } = req.params;

        try {
            let action = null;

            let { mode } = req.query;
            if (mode) {
                action = await Action.findByIdAndUpdate({ _id: id }, { deleted_at: (mode === 'softdelete' ? Date.now() : null) }, { new: true });
            } else {
                mode = 'delete';
                action = await Action.findOneAndRemove({ _id: id });
            }

            if (!action) {
                throw new APIError(404, `Action with id: ${id} not found!`);
            } else {
                return res.status(200).json({ message: `Successful deleted the Action with id: ${id}!`, action, mode });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Action with id: ${id}!`, next);
        }
    }
}

export default ActionController;
