import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    products: {
      type: [Map],
      required: true,
    },
    totalAmount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Orders", OrdersSchema);
