const Contract = require("../models/Contract.js");

// get all contracts
exports.getAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.find().populate([
      "customerId",
      "adminId",
      "helperId",
    ]);
    return res.status(200).json({ data: contracts });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch contracts." });
  }
};

// get contract by ID
exports.getContractById = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id).populate([
      "customerId",
      "adminId",
      "helperId",
    ]);
    if (!contract) {
      return res.status(404).json({ error: "Contract not found." });
    }
    return res.status(200).json({ data: contract });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch contract by ID." });
  }
};

// search by contract number
exports.searchContractsByContractNumber = async (req, res) => {
  try {
    const contracts = await Contract.find({
      contractNumber: { $regex: req.query.contractNumber, $options: "i" },
    }).populate(["customerId", "adminId", "helperId"]);
    return res.json({ data: contracts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// create contract
exports.createContract = async (req, res) => {
  try {
    if ((!req.admin || !req.admin.id) && (!req.helper || !req.helper.id)) {
      return res.status(401).json({
        error: "Unauthorized: admin or helper credentials are missing.",
      });
    }
    const helperId = req.helper ? req.helper.id : null;
    const adminId = req.admin ? req.admin.id : null;
    const contract = new Contract({
      ...req.body,
      adminId,
      helperId,
    });
    await contract.save();
    return res.status(201).json({ data: contract });
  } catch (error) {
    return res.status(400).json({ error: "Failed to create contract." });
  }
};

// update contract
exports.updateContract = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) {
      return res.status(404).json({ error: "Contract not found." });
    }
    if (req.admin && req.admin.id !== contract.adminId) {
      return res
        .status(403)
        .json({ error: "Forbidden: admin credentials are missing." });
    }
    if (req.helper && req.helper.id !== contract.helperId) {
      return res
        .status(403)
        .json({ error: "Forbidden: helper credentials are missing." });
    }
    await Contract.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({ message: "Contract updated successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update contract." });
  }
};

// delete contract
exports.deleteContract = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) {
      return res.status(404).json({ error: "Contract not found." });
    }
    if (req.admin && req.admin.id !== contract.adminId) {
      return res
        .status(403)
        .json({ error: "Forbidden: admin credentials are missing." });
    }
    if (req.helper && req.helper.id !== contract.helperId) {
      return res
        .status(403)
        .json({ error: "Forbidden: helper credentials are missing." });
    }
    await Contract.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Contract deleted successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete contract." });
  }
};
