"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compiledMemoryModel_1 = require("../../models/compiledMemoryModel");
const router = express_1.default.Router();
// @route   GET /api/compiled-memory/
// @desc    Retrieve all compiled-memory section
// @access  Public
router.get("/", (req, res) => {
    console.log("Retrieve all compiled-memory section"); // Debug
    compiledMemoryModel_1.CompiledMemory.find()
        .sort({ date: 1 })
        .then((item) => res.json(item))
        .catch((err) => res.json(err));
});
// @route   GET /api/compiled-memory/
// @desc    Retrieve all compiled-memory section with record details
// @access  Public
router.get("/details-record/", (req, res) => {
    console.log("Retrieve all compiled-memory section with record details"); // Debug
    compiledMemoryModel_1.CompiledMemory.find()
        .populate("records.record")
        .sort({ date: 1 })
        .then((item) => res.json(item))
        .catch((err) => res.json(err));
});
// @route   GET /api/compiled-memory/:id
// @desc    Retrieve specific compiled-memory section by id
// @access  Public
router.get("/:compiled_memory_id", (req, res) => {
    const { compiled_memory_id } = req.params;
    console.log("Retrieve specific compiled-memory section by id ", req.params); // Debug
    // find specific record compiled-memory section and populate the records with record details
    compiledMemoryModel_1.CompiledMemory.find({ _id: compiled_memory_id })
        .then((item) => res.json(item))
        .catch((err) => res.json(err));
});
// @route   GET /api/compiled-memory/:id
// @desc    Retrieve specific compiled-memory section with record details by id
// @access  Public
router.get("/details-record/:compiled_memory_id", (req, res) => {
    const { compiled_memory_id } = req.params;
    console.log("Retrieve specific compiled-memory section with record details by id", req.params); // Debug
    // find specific record compiled-memory section and populate the records with record details
    compiledMemoryModel_1.CompiledMemory.find({ _id: compiled_memory_id })
        .populate("records.record")
        .then((item) => res.json(item))
        .catch((err) => res.json(err));
});
// @route   POST /api/compiled-memory/
// @desc    Create an instance of the record's compiled-memory section
// @access  Public
router.post("/", (req, res) => {
    const { title, description, images, records, creator } = req.body;
    console.log("Create an instance of the record's compiled-memory section", req.body); // Debug
    // Checking for missing field
    if (!title && !description && !images && !records && !creator)
        return res.status(400).json({ error: "Missing field" });
    // create an instance of the record's compiled-memory section
    const newItem = new compiledMemoryModel_1.CompiledMemory({ title, description, images, records, creator });
    newItem
        .save()
        .then((item) => res.json(item))
        .catch((item) => res.json(item));
});
// @route   PUT /api/compiled-memory/
// @desc    Update compiled-memory by _id
// @access  Public
router.put("/", (req, res) => {
    const { updItem, _id } = req.body;
    compiledMemoryModel_1.CompiledMemory.updateOne({ _id }, { $set: updItem })
        .then((updItem) => res.json(updItem))
        .catch((err) => res.json({ err }));
});
// @route	POST /api/compiled-memory
// @desc	Append compiled-memory record
// @access	Public
router.patch("/", (req, res) => {
    const { record_id, compiled_memory_id } = req.body;
    console.log("Append compiled-memory record", req.body); // Debug
    // Checking for missing field
    if (!record_id || !compiled_memory_id)
        return res.status(400).json({ error: "Missing field" });
    // checking if there is an existing compiled-memory
    compiledMemoryModel_1.CompiledMemory.findById(compiled_memory_id)
        .then((compiledMemory) => {
        // checking if there is an existing compiled-memory
        if (!compiledMemory)
            return res.json({ err: "compile memory doesn't exist" });
        // checking if there is an existing record
        if (compiledMemory.records.find((item) => item.record == record_id))
            return res.status(400).json({ error: "record already exist in compiled memory" });
        // Append the message to record's compiled-memory section
        compiledMemoryModel_1.CompiledMemory.findOneAndUpdate({ _id: compiled_memory_id }, { $push: { records: { record: record_id } } })
            .then((item) => res.json({ msg: "Added record successfully", item }))
            .catch((err) => res.json({ err }));
    })
        .catch((err) => res.json({ err }));
});
// @route	DELETE /api/compiled-memory
// @desc	Remove record to compiled-memory
// @access	Public
router.delete("/", (req, res) => {
    const { record_id, compiled_memory_id } = req.body;
    console.log("Remove record to compiled-memory", req.body);
    // Checking for missing field
    if (!record_id || !compiled_memory_id)
        return res.status(400).json({ error: "Missing field" });
    compiledMemoryModel_1.CompiledMemory.findById(compiled_memory_id)
        .then((compiledMemory) => {
        // checking if there is an existing compiled-memory
        if (!compiledMemory)
            return res.json({ err: "compile memory doesn't exist" });
        // checking if there is an existing record
        if (!compiledMemory.records.find((item) => item.record == record_id))
            return res.status(400).json({ error: "record doesn't exist in compiled memory" });
        // remove the instance of the record from compiled-memory
        compiledMemoryModel_1.CompiledMemory.findOneAndUpdate({ _id: compiled_memory_id }, { $pull: { records: { record: record_id } } }, { safe: true, multi: true })
            .then(() => res.json({ msg: "Deleted successfully" }))
            .catch((err) => res.json(err));
    })
        .catch((err) => res.json({ err }));
});
module.exports = router;
