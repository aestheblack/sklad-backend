const { Schema, Types, model } = require("mongoose");
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    barCode: {
      type: String,
      required: true,
    },
    quantity: {
      default: 0,
      type: Number,
    },
    price: {
      default: 0,
      type: Number,
    },
    category: {
      type: Types.ObjectId,
      ref: "categories",
      required: true,
    },
    customer: {
      type: Types.ObjectId,
      ref: "customers",
      required: true,
    },
    photoUrl: [
      {
        type: String,
      },
    ],
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
