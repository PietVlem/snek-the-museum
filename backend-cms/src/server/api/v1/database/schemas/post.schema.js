import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import slug from 'slug';

const { Schema } = mongoose;

const PostSchema = new Schema(
    {
        title: { type: String, required: true, max: 128 },
        synopsis: { type: String, required: true, max: 1024 },
        body: { type: String, required: false },
        slug: {
            type: String, lowercase: true, unique: true, required: true,
        },
        published_at: { type: Date, required: false },
        deleted_at: { type: Date, required: false },
        categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: false },
        blogId: { type: Schema.Types.ObjectId, ref: 'Blog', required: false },
        museumId: { type: Schema.Types.ObjectId, ref: 'Museum', required: false },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    },
);

PostSchema.methods.slugify = function () {
    this.slug = slug(this.title);
};

PostSchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    return next();
});

PostSchema.virtual('id').get(function () { return this._id; });

PostSchema.virtual('category', {
    ref: 'Category',
    localField: 'categoryId',
    foreignField: '_id',
    justOne: true,
});

PostSchema.virtual('blog', {
    ref: 'Blog',
    localField: 'blogId',
    foreignField: '_id',
    justOne: true,
});

PostSchema.virtual('museum', {
    ref: 'Museum',
    localField: 'museumId',
    foreignField: '_id',
    justOne: true,
});

PostSchema.plugin(mongoosePaginate);
export default mongoose.model('Post', PostSchema);
