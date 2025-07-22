import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", ProductsSchema);
