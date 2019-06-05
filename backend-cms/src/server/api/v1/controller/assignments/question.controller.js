/*
Import the external libraries:
- uuidv4
*/

/*
Import the internal libraries:
- * from database
- errorHandler
*/
import { Question } from '../../database';
import { APIError, handleAPIError } from '../../../../utilities';

class QuestionController {
    // List all the models
    index = async (req, res, next) => {
        try {
            const { limit, skip } = req.query;
            let questions = null;
            if (limit && skip) {
                const options = {
                    page: parseInt(skip, 10) || 1,
                    limit: parseInt(limit, 10) || 10,
                    populate: 'exhibition',
                    sort: { created_at: -1 },
                };
                questions = await Question.paginate({}, options);
            } else {
                questions = await Question.find().populate('exhibition').sort({ created_at: -1 }).exec();
            }

            if (questions === undefined || questions === null) {
                throw new APIError(404, 'Collection for questions not found!');
            }
            return res.status(200).json(questions);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving questions', next);
        }
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await Question.findById(id).populate('category').exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `Question with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving questions', next);
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
            const questionCreate = new Question({
                exhibitionId : res.body.exhibitionId,
                question: req.body.question,
                posibilities: req.body.posibilities,
                answer: req.body.answer
            });
            const question = await questionCreate.save();
            return res.status(201).json(question);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the Question!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const { id } = req.params;

        try {
            const question = await Question.findById(id).exec();

            if (!question) {
                throw new APIError(404, `Question with id: ${id} not found!`);
            } else {
                const vm = {
                    question,
                    categories: [],
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Question with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const { id } = req.params;

        try {
            const questionUpdate = req.body;
            const question = await Question.findOneAndUpdate({ _id: id }, questionUpdate, { new: true }).exec();

            if (!question) {
                throw new APIError(404, `Question with id: ${id} not found!`);
            }
            return res.status(200).json(question);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Question with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const { id } = req.params;

        try {
            let question = null;

            let { mode } = req.query;
            if (mode) {
                question = await Question.findByIdAndUpdate({ _id: id }, { deleted_at: (mode === 'softdelete' ? Date.now() : null) }, { new: true });
            } else {
                mode = 'delete';
                question = await Question.findOneAndRemove({ _id: id });
            }

            if (!question) {
                throw new APIError(404, `Question with id: ${id} not found!`);
            } else {
                return res.status(200).json({ message: `Successful deleted the Question with id: ${id}!`, question, mode });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Question with id: ${id}!`, next);
        }
    }
}

export default QuestionController;
