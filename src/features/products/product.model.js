import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: String, required: true },
    images: {
      type: [String],
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length >= 1 && val.length <= 4;
        },
        message: "Product must have between 1 and 4 images.",
      },
      // required: true
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
