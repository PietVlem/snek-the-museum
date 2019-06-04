import mongoose, { mongo } from 'mongoose';

const { Schema } = mongoose;

const baseOptions = {
    /*
    Our discriminator key, could be anything
    */
    discriminatorKey: 'assignments',
    /*
    The name of our collection
    */
    collection: 'assignments',
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
};

/* 
Our Base schema: these properties will be shared with our "real" schemas
*/
const baseSchema = new Schema(
    {
        exhibitionId: {
            type: Schema.Types.ObjectId,
            ref: 'Exhibition',
            required: true
        }
    },
    baseOptions,
);

baseSchema.virtual('id').get(function () { return this._id; });

baseSchema.virtual('exhibition', {
    ref: 'Exhibition',
    localField: 'exhibitionId',
    foreignField: '_id',
    justOne: true,
})

module.exports = mongoose.model('Base', baseSchema);