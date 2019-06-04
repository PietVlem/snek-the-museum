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
};

/* 
Our Base schema: these properties will be shared with our "real" schemas
*/
const Base = mongoose.model('Base', new Schema(
    {
        exhibitionId: {
            type: Schema.Types.ObjectId,
            ref: 'Exhibition',
            required: true
        }
    },
    baseOptions,
),
);


module.exports = mongoose.model('Base');