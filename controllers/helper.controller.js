const bcrypt = require("bcrypt");
const Helper = require("../models/Helper.js");
const { sign } = require("../utils/jwt.js");

// get all helpers
exports.getAllHelpers = async (req, res) => {
  try {
    const helpers = await Helper.find();
    return res.json({ data: helpers });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get me helper
exports.getMeHelper = async (req, res) => {
  try {
    const helper = await Helper.findById(req.helper.id);
    if (!helper) {
      return res.status(404).json({ message: "Helper not found" });
    }
    return res.status(200).json({ data: helper });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get helper by id
exports.getHelperById = async (req, res) => {
  try {
    const helper = await Helper.findById(req.params.id);
    if (!helper) {
      return res.status(404).json({ message: "Helper not found" });
    }
    return res.json({ data: helper });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// search by username or full name helpers
exports.searchByUsernameOrFullName = async (req, res) => {
  try {
    const helpers = await Helper.find({
      $or: [
        { username: { $regex: req.query.search, $options: "i" } },
        { fullName: { $regex: req.query.search, $options: "i" } },
      ],
    });
    return res.json({ data: helpers });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// add helper
exports.addHelper = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newHelper = new Helper({
      ...req.body,
      password: hashedPassword,
    });
    await newHelper.save();
    const token = sign({
      id: newHelper._id,
      role: newHelper.role,
      username: newHelper.username,
      createdAt: newHelper.createdAt,
    });
    return res.status(200).json({
      data: {
        token,
        role: newHelper.role,
        username: newHelper.username,
      },
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// login helper
exports.loginHelper = async (req, res) => {
  try {
    const helper = await Helper.findOne({ username: req.body.username });
    if (!helper) {
      return res.status(404).json({ message: "Helper not found" });
    }
    const isMatch = await bcrypt.compare(req.body.password, helper.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = sign({
      id: helper._id,
      role: helper.role,
      username: helper.username,
      createdAt: helper.createdAt,
    });
    return res.status(200).json({
      data: {
        token,
        role: helper.role,
        username: helper.username,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// update me helper
exports.meUpdateHelper = async (req, res) => {
  try {
    const { userId } = req;
    const { password, ...otherData } = req.body;

    let updateData = { ...otherData };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }

    const helper = await Helper.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!helper) {
      return res.status(404).json({ error: "Helper not found." });
    }

    return res.status(200).json({ data: helper });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update Helper." });
  }
};

// update helper
exports.updateHelper = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }
    const helper = await Helper.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!helper) {
      return res.status(404).json({ message: "Helper not found" });
    }
    return res.json({ data: helper });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// delete helper
exports.deleteHelper = async (req, res) => {
  try {
    const helper = await Helper.findByIdAndDelete(req.params.id);
    if (!helper) {
      return res.status(404).json({ message: "Helper not found" });
    }
    return res.json({ data: helper });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
