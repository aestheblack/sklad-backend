const Customer = require("../models/Customer.js");

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    return res.status(200).json({ data: customers });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Search customer by name
exports.searchCustomersByName = async (req, res) => {
  try {
    const customers = await Customer.find({
      fullName: { $regex: req.query.fullName, $options: "i" },
    });
    return res.status(200).json({ data: customers });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Add a new customer
exports.addCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    return res.status(201).json({ data: customer });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    return res.status(200).json({ data: customer });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update customer by ID
exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    return res.status(200).json({ data: customer });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete customer by ID
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    return res.status(200).json({ data: customer });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
