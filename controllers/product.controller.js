const Product = require("../models/Product.js");

// Добавить товар
exports.addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    return res.status(201).json({ data: newProduct });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// search by name products
exports.searchProductsByName = async (req, res) => {
  try {
    const products = await Product.find({
      name: { $regex: req.query.name, $options: "i" },
    }).popuplate("category");
    return res.json({ data: products });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// search by barcode products
exports.searchProductsByBarcode = async (req, res) => {
  try {
    const products = await Product.find({
      barCode: { $regex: req.query.barCode, $options: "i" },
    }).popuplate("category");
    return res.json({ data: products });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Получить все товары
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().popuplate("category");
    return res.json({ data: products });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Получить товар по id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).popuplate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json({ data: product });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Обновить товар
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json({ data: updatedProduct });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Удалить товар
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json({ data: deletedProduct });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
