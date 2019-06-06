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
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        },
        password: {
            type: String,
            required: false,
        },
        localProvider: {
            password: {
                type: String,
                required: false,
            },
        },
        /*
       facebookProvider: {
           id: { type: String, required: false },
           token: { type: String, required: false },
       },
       */
        name: { type: String, required: false },
        dayOfBirth: { type: Date, required: false },
        avatar: { type: String, required: false },
        userRole: { type: String, required: false },
        museumsVisited: { type: Array, required: false },
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


UserSchema.pre('save', async function (next) {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(config.auth.bcrypt.saltWorkFactor);
        // Generate a password hash (salt + hash)
        const passwordHash = await bcrypt.hash(this.password, salt);
        // Re-assign hashed version over original, plain text password
        this.password = passwordHash;
        // next
        next();
    } catch (error) {
        return next(error);
    }
});

UserSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
}

UserSchema.virtual('id').get(function () { return this._id; });

UserSchema.plugin(mongoosePaginate);
export default mongoose.model('User', UserSchema);
