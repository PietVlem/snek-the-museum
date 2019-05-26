import mongoose from 'mongoose';

const { Schema } = mongoose;

var options = { 
    discriminatorKey: 'assignment' 
};

// Base Assignment model
var baseSchema = new Schema(
    {
        exhibitionId: {
            type: Number, required: true
        }
    },
    options
);

const Assignment = mongoose.model('Assignment', baseSchema);

// Question model
var questionSchema = new Schema(
    {
        question:{ type: String, required: true },
        posibilities: { type: Array, required: true }
    },
    options
);

const Question = Assignment.discriminator('Question', questionSchema);

/*
const question = new Question({
    exhibitionId: 1,
    question: 'How bad do i smell?',
    posibilities: ['bad', 'very bad', 'super very bad']
})
question.save();
*/


export default { Assignment, Question }
