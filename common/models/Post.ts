import mongoose, { Schema, InferSchemaType, HydratedDocument } from "mongoose";
import { Category, categorySchema } from "./Category";
import { Tag, tagSchema } from "./Tag";

const postSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    image: {
      thumbnail: { type: String },
      full: { type: String },
    },
    banner: { type: String },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    views: { type: Number, default: 0 },
    metaDescription: { type: String },
    notIndexable: {type: Boolean, default: false},
    hideBanner: {type: Boolean, default: false}
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // <-- include virtuals in `JSON.stringify()`
  }
);

postSchema.set("toObject", { getters: true });
postSchema.set("toJSON", { getters: true });

const CategoryModel =
  mongoose.models.Category ||
  mongoose.model<Category>('Category', categorySchema);

const TagModel =
  mongoose.models.Tag ||
  mongoose.model<Tag>('Tag', tagSchema);

export type Post = HydratedDocument<InferSchemaType<typeof postSchema>>;

const PostModel = () => mongoose.model<Post>("Post", postSchema);
export default (mongoose.models.Post || PostModel()) as ReturnType<
  typeof PostModel
>;
