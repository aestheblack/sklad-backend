const { Schema, model } = require("mongoose");
const filesSchema = new Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Files = model("files", filesSchema);
module.exports = Files;
