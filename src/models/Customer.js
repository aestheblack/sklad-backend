const { Schema, model } = require("mongoose");
const customerSchema = new Schema(
  {
    fullName: {
      type: String,
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

const Customer = model("customers", customerSchema);
module.exports = Customer;