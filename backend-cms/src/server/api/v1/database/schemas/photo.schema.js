import mongoose from 'mongoose';
import slug from 'slug';

const { Schema } = mongoose;

const photoSchema = new Schema(
    {
        name: {type: String, required: false  },
        url: {type: String, required: true},
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

photoSchema.methods.slugify = function () {
    this.slug = slug(this.name);
};

photoSchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    return next();
});

photoSchema.virtual('id').get(function () { return this._id; });

export default mongoose.model('Photo', photoSchema);
