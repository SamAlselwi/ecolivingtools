import mongoose, { HydratedDocument, Schema, InferSchemaType } from "mongoose";

export const tagSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String },
    status: { type: Boolean, default: false },
    metaDescription: { type: String },
    metaTitle: { type: String },
  },
  {
    timestamps: true,
  }
);

export type Tag = HydratedDocument<InferSchemaType<typeof tagSchema>>;

tagSchema.set("toObject", { getters: true });
tagSchema.set("toJSON", { getters: true });

const TagModel = () => mongoose.model<Tag>("Tag", tagSchema);
export default (mongoose.models.Tag || TagModel()) as ReturnType<
  typeof TagModel
>;
