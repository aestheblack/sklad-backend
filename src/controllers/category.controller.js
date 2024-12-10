const Category = require("../models/Category.js");

// Add a new category
exports.addCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    return res.status(201).json({ data: category });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ data: categories });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// search category by name
exports.searchCategoriesByName = async (req, res) => {
  try {
    const categories = await Category.find({
      name: { $regex: req.query.name, $options: "i" },
    });
    return res.status(200).json({ data: categories });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.status(200).json({ data: category });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update category by ID
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.status(200).json({ data: category });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
