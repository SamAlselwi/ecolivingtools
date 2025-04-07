import mongoose, { Schema, InferSchemaType, HydratedDocument } from "mongoose";

export const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    parentId: { type: String },
    description: { type: String },
    status: { type: Boolean, default: false },
    type: {
      type: String,
      enum: ["shop", "blog"],
      trim: true,
      default: "blog",
    },
    icon: { type: String },
    order: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    metaDescription: { type: String },
    inRoot: { type: Boolean, default: false },
    metaTitle: { type: String },
  },
  {
    timestamps: true,
  }
);

categorySchema.set("toObject", { getters: true });
categorySchema.set("toJSON", { getters: true });

export type Category = HydratedDocument<InferSchemaType<typeof categorySchema>>;

const CategoryModel = () => mongoose.model<Category>("Category", categorySchema);
export default (mongoose.models.Category || CategoryModel()) as ReturnType<
  typeof CategoryModel
>;
