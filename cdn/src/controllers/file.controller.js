const Files = require("../models/File.js");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");

exports.upload = async (req, res) => {
  try {
    const publicFolderPath = `./uploads`;
    const storage = multer.diskStorage({
      destination: publicFolderPath,
      filename: (req, file, cb) => {
        const fileId = new mongoose.Types.ObjectId().toString();
        const fileExtension = path.extname(file.originalname);
        const fileName = `${fileId}${fileExtension}`;
        cb(null, fileName);
      },
    });
    const upload = multer({ storage }).single("file");
    upload(req, res, async (error) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      if (!req.file) {
        return res.status(400).json({ message: "Please upload a file" });
      }
      const newFile = new Files({
        fileName: req.file.filename,
        fileUrl: `http://localhost:5001/uploads/${req.file.filename}`,
      });
      await newFile.save();
      return res.status(200).json({ data: newFile });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
