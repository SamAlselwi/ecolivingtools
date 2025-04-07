import mongoose, { HydratedDocument, Schema, InferSchemaType } from 'mongoose';

// Define the schema for the slugs collection
const slugSchema = new Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  referenceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  referenceType: {
    type: String,
    required: true,
    enum: ['post', 'tag', 'category'] // adjust the values as needed
  },
  prefix: {
    type: String,
    default: ''
  }
}, { timestamps: true });


export type Slug = HydratedDocument<InferSchemaType<typeof slugSchema>>;

slugSchema.set('toObject', { getters: true });
slugSchema.set('toJSON', { getters: true });

slugSchema.pre('save', function (): void {
  this.updatedAt = new Date();
});

const SlugModel = mongoose.models.Slug || mongoose.model<Slug>('Slug', slugSchema);
export default SlugModel;
