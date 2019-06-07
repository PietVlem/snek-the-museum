/*
Import external libraries:
- config
*/
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import bcrypt from 'bcrypt';

/*
Import internal libraries:
- config
*/
import config from '../../../../config';


/*
Constants
*/
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        method: {
            type: String,
            enum: ['local', 'facebook'],
            required: true
        },
        local: {
            email: {
                type: String, 
                lowercase: true,
                match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            },
            password: {
                type: String
            }
        },
        facebook: {
            id: {
                type: String
            },
            email: {
                type: String,
                lowercase: true,
                required: false,
            }
        },
        name: { type: String, required: false },
        dayOfBirth: { type: Date, required: false },
        avatar: { type: String, required: false },
        userRole: { type: String, required: false },
        museumsVisitedIds: [{
            type: Schema.Types.ObjectId,
            ref: 'Museum',
            required: false
        }],
        published_at: { type: Date, required: false },
        deleted_at: { type: Date, required: false },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    },
);

UserSchema.virtual('museum', {
    ref: 'Museum',
    localField: 'museumsVisitedIds',
    foreignField: '_id'
})


UserSchema.pre('save', async function (next) {
    try {
        if (this.method !== 'local') {
            next();
        }

        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Generate a password hash (salt + hash)
        const passwordHash = await bcrypt.hash(this.local.password, salt);
        // Re-assign hashed version over original, plain text password
        this.local.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.local.password);
    } catch (error) {
        throw new Error(error);
    }
}

UserSchema.virtual('id').get(function () { return this._id; });

UserSchema.plugin(mongoosePaginate);
export default mongoose.model('User', UserSchema);
