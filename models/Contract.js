const { Schema, Types, model } = require("mongoose");
const contractSchema = new Schema(
  {
    contractNomer: {
      type: String,
      unique: true,
      required: true,
    },
    customerId: {
      type: Types.ObjectId,
      ref: "customers",
      required: true,
    },
    adminId: {
      type: Types.ObjectId,
      ref: "admins",
    },
    helperId: {
      type: Types.ObjectId,
      ref: "helpers",
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
