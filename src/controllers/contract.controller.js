const Contract = require("../models/Contract.js");

// get all contracts
exports.getAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.find();
    return res.status(200).json({ data: contracts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// search contract by contractNomer
exports.searchContractsByContractNomer = async (req, res) => {
  try {
    const contracts = await Contract.find({
      contractNomer: { $regex: req.query.contractNomer, $options: "i" },
    });
    return res.status(200).json({ data: contracts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// add a new contract
exports.addContract = async (req, res) => {
  try {
    const contract = new Contract(req.body);
    await contract.save();
    return res.status(201).json({ data: contract });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get contract by ID
exports.getContractById = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) {
      return res.status(404).json({ error: "Contract not found" });
    }
    return res.status(200).json({ data: contract });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update contract by ID
exports.updateContract = async (req, res) => {
  try {
    const contract = await Contract.findByIdAndUpdate(req.params.id, req.body);
    if (!contract) {
      return res.status(404).json({ error: "Contract not found" });
    }
    return res.status(200).json({ data: contract });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete contract by ID
exports.deleteContract = async (req, res) => {
  try {
    const contract = await Contract.findByIdAndDelete(req.params.id);
    if (!contract) {
      return res.status(404).json({ error: "Contract not found" });
    }
    return res.status(200).json({ data: contract });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
