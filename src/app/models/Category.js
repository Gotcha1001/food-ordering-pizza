import mongoose, { Schema, model, models } from "mongoose";

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

// Export or create the model if it doesn't exist
export const Category = models?.Category || model("Category", CategorySchema);
