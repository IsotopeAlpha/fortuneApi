import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Categories", CategoriesSchema);
