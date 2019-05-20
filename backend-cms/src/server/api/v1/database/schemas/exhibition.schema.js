import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import slug from 'slug';

const { Schema } = mongoose;

const ExhibitionSchema = new Schema(
    {
        name: { type: String, required: true, max: 128 },
        image: { type: String, required: false },
        info: { type: String, required: false },
        gallery: { type: Array, required: false } ,
        slug: {
            type: String, lowercase: true, unique: true, required: true,
        },
        published_at: { type: Date, required: false },
        deleted_at: { type: Date, required: false },
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

ExhibitionSchema.methods.slugify = function () {
    this.slug = slug(this.name);
};

ExhibitionSchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    return next();
});

ExhibitionSchema.virtual('id').get(function () { return this._id; });

ExhibitionSchema.virtual('museum', {
    ref: 'Museum',
    localField: 'museumId',
    foreignField: '_id',
    justOne: true,
});

ExhibitionSchema.plugin(mongoosePaginate);
export default mongoose.model('Exhibition', ExhibitionSchema);
