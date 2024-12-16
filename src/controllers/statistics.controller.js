const Product = require("../models/Product.js");
const Contract = require("../models/Contract.js");

exports.contractsByMonth = async (req, res) => {
  try {
    const contracts = await Contract.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: 1 },
          customers: { $addToSet: "$customer" }, // Collect customer IDs
        },
      },
      {
        $lookup: {
          from: "customers", // Name of the customers collection
          localField: "customers",
          foreignField: "_id",
          as: "customerDetails",
        },
      },
    ]);
    return res.json({ data: contracts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.productsByCategory = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $group: {
          _id: "$category", // Group by category ID
          total: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "categories", // Name of the categories collection
          localField: "_id",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: "$categoryDetails", // Flatten the categoryDetails array
      },
    ]);
    return res.json({ data: products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.productsByCustomer = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $group: {
          _id: "$customer", // Group by customer ID
          total: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "customers", // Name of the customers collection
          localField: "_id",
          foreignField: "_id",
          as: "customerDetails",
        },
      },
      {
        $unwind: "$customerDetails", // Flatten the customerDetails array
      },
    ]);
    return res.json({ data: products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
