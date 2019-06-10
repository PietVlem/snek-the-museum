/*
Import the external libraries:
- uuidv4
*/

/*
Import the internal libraries:
- * from database
- errorHandler
*/
import { Reaction } from '../database';
import { APIError, handleAPIError } from '../../../utilities';

class ReactionController {
    // List all the models
    index = async (req, res, next) => {
        try {
            const { limit, skip } = req.query;
            let reactions = null;
            if (limit && skip) {
                const options = {
                    page: parseInt(skip, 10) || 1,
                    limit: parseInt(limit, 10) || 10,
                    populate: 'category',
                    sort: { created_at: -1 },
                };
                reactions = await Reaction.paginate({}, options);
            } else {
                reactions = await Reaction.find().populate('category').sort({ created_at: -1 }).exec();
            }

            if (reactions === undefined || reactions === null) {
                throw new APIError(404, 'Collection for reactions not found!');
            }
            return res.status(200).json(reactions);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving reactions', next);
        }
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await Reaction.findById(id).populate('category').populate('blog').exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `Reaction with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving reactions', next);
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
            const reactionCreate = new Reaction({
                title: req.body.title,
                synopsis: req.body.synopsis,
                body: req.body.body,
                categoryId: req.body.categoryId
            });
            const reaction = await reactionCreate.save();
            return res.status(201).json(reaction);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the Reaction!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const { id } = req.params;

        try {
            const reaction = await Reaction.findById(id).exec();

            if (!reaction) {
                throw new APIError(404, `Reaction with id: ${id} not found!`);
            } else {
                const vm = {
                    reaction,
                    categories: [],
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Reaction with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const { id } = req.params;

        try {
            const reactionUpdate = req.body;
            const reaction = await Reaction.findOneAndUpdate({ _id: id }, reactionUpdate, { new: true }).exec();

            if (!reaction) {
                throw new APIError(404, `Reaction with id: ${id} not found!`);
            }
            return res.status(200).json(reaction);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Reaction with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const { id } = req.params;

        try {
            let reaction = null;

            let { mode } = req.query;
            if (mode) {
                reaction = await Reaction.findByIdAndUpdate({ _id: id }, { deleted_at: (mode === 'softdelete' ? Date.now() : null) }, { new: true });
            } else {
                mode = 'delete';
                reaction = await Reaction.findOneAndRemove({ _id: id });
            }

            if (!reaction) {
                throw new APIError(404, `Reaction with id: ${id} not found!`);
            } else {
                return res.status(200).json({ message: `Successful deleted the Reaction with id: ${id}!`, reaction, mode });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Reaction with id: ${id}!`, next);
        }
    }
}

export default ReactionController;
