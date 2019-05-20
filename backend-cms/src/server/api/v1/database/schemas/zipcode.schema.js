import mongoose from 'mongoose';
import slug from 'slug';

const { Schema } = mongoose;

const zipcodeSchema = new Schema(
    {
        code: { type: Number, required: true },
        city: { type: String, required: true },
        country: {type: String, required: true },
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

zipcodeSchema.methods.slugify = function () {
    this.slug = slug(this.city);
};

zipcodeSchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    return next();
});

zipcodeSchema.virtual('id').get(function () { return this._id; });

export default mongoose.model('Zipcode', zipcodeSchema);
