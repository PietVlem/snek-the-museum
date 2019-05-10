import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import slug from 'slug';

const { Schema } = mongoose;

const MuseumSchema = new Schema(
    {
        title: { type: String, required: true, max: 128 },
        body: { type: String, required: false },
        published_at: { type: Date, required: false },
        deleted_at: { type: Date, required: false },
        categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: false },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    },
);

MuseumSchema.methods.slugify = function () {
    this.slug = slug(this.title);
};

MuseumSchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    return next();
});

MuseumSchema.virtual('id').get(function () { return this._id; });
MuseumSchema.virtual('category', {
    ref: 'Category',
    localField: 'categoryId',
    foreignField: '_id',
    justOne: true,
});

MuseumSchema.plugin(mongoosePaginate);
export default mongoose.model('Museum', MuseumSchema);
