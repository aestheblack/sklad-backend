const { Schema, Types, model } = require("mongoose");
const contractSchema = new Schema(
  {
    contractNomer: {
      type: String,
      unique: true,
      required: true,
    },
    customer: {
      type: Types.ObjectId,
      ref: "customers",
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

const Contract = model("contracts", contractSchema);
module.exports = Contract;