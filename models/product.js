const { Schema, Types, model } = require("mongoose");
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Types.ObjectId,
      ref: "categories",
      required: true,
    },
    barCode: {
      type: String,
      required: true,
    },
    quantity: {
      default: 0,
      type: Number,
      required: true,
    },
    price: {
      default: 0,
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    versionKey: false,
  }
);

const Product = model("products", productSchema);
module.exports = Product;
