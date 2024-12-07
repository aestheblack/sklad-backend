const bcrypt = require("bcrypt");
const { sign } = require("../utils/jwt.js");
const Customer = require("../models/Customer.js");

// get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    return res.status(200).json({ data: customers });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch customers." });
  }
};

// get customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found." });
    }
    return res.status(200).json({ data: customer });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch customer by ID." });
  }
};

// register customer
exports.registerCustomer = async (req, res) => {
  try {
    const { password, ...otherData } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const customer = new Customer({
      ...otherData,
      password: hashedPassword,
    });

    await customer.save();
    return res.status(201).json({ data: customer });
  } catch (error) {
    return res.status(400).json({ error: "Failed to register customer." });
  }
};

// login customer
exports.loginCustomer = async (req, res) => {
  try {
    const { username, password } = req.body;

    const customer = await Customer.findOne({ username });
    if (!customer) {
      return res.status(404).json({ error: "Customer not found." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, customer.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid password." });
    }

    const token = sign({
      id: customer._id,
      role: customer.role,
      username: customer.username,
      createdAt: customer.createdAt,
    });

    return res.status(200).json({
      data: {
        token,
        role: customer.role,
        username: customer.username,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to login customer." });
  }
};

// delete customer
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found." });
    }
    return res.status(200).json({ data: customer });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete customer." });
  }
};

// update customer
exports.updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCustomer) {
      return res.status(404).json({ error: "Customer not found." });
    }
    return res.status(200).json({ data: updatedCustomer });
  } catch (error) {
    return res.status(400).json({ error: "Failed to update customer." });
  }
};
