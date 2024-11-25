const bcrypt = require("bcrypt");
const Admin = require("../models/Admin.js");
const { sign } = require("../utils/jwt.js");

// Get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    return res.status(200).json({ data: admins });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch admins." });
  }
};

// Get current admin
exports.getMeAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found." });
    }
    return res.status(200).json({
      data: { username: admin.username },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch admin details." });
  }
};

// Get admin by ID
exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found." });
    }
    return res.status(200).json({ data: admin });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch admin by ID." });
  }
};

// Register admin
exports.registerAdmin = async (req, res) => {
  try {
    const { password, ...otherData } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new Admin({
      ...otherData,
      password: hashedPassword,
    });

    await admin.save();
    return res.status(201).json({ data: admin });
  } catch (error) {
    return res.status(400).json({ error: "Failed to register admin." });
  }
};

// Login admin
exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Incorrect password." });
    }

    const token = sign({
      id: admin._id,
      role: admin.role,
      username: admin.username,
      createdAt: admin.createdAt,
    });

    return res.status(200).json({
      data: {
        token,
        role: admin.role,
        username: admin.username,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to login admin." });
  }
};

// Update current admin
exports.meUpdateAdmin = async (req, res) => {
  try {
    const { userId } = req;
    const { password, ...otherData } = req.body;

    let updateData = { ...otherData };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }

    const admin = await Admin.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!admin) {
      return res.status(404).json({ error: "Admin not found." });
    }

    return res.status(200).json({ data: admin });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update admin." });
  }
};

// Update admin by ID
exports.updateAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required." });
    }

    const updateData = { username };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ error: "Admin not found." });
    }

    return res.status(200).json({ message: "Admin updated successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update admin." });
  }
};

// Delete admin by ID
exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found." });
    }
    return res.status(200).json({ data: admin });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete admin." });
  }
};
