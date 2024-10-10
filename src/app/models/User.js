import { model, models, Schema } from "mongoose"; // Import 'Schema' directly here

// Define the User schema
const UserSchema = new Schema(
  {
    name: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    image: { type: String },
  },
  { timestamps: true }
);

export const User = models?.User || model("User", UserSchema);
