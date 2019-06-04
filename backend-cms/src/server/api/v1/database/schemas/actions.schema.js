import mongoose from 'mongoose';

const { Schema } = mongoose;

const actionSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        assignmentId: {
            type: Schema.Types.ObjectId,
            ref: 'Base',
            required: true
        },
        completed: {
            type: Boolean,
            required: true
        },
        successful: {
            type: Boolean,
            required: true
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

actionSchema.virtual('id').get(function () { return this._id; });

actionSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
})

actionSchema.virtual('assignment', {
    ref: 'Base',
    localField: 'assignmentId',
    foreignField: '_id',
    justOne: true,
})

export default mongoose.model('Action', actionSchema);
