import mongoose from 'mongoose';
import slug from 'slug';

const { Schema } = mongoose;

const disabilitySchema = new Schema(
    {
        name: { type: String, required: true },
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

disabilitySchema.methods.slugify = function () {
    this.slug = slug(this.name);
};

disabilitySchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    return next();
});

disabilitySchema.virtual('id').get(function () { return this._id; });

export default mongoose.model('Disability', disabilitySchema);
