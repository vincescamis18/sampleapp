"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recordModel_1 = require("../../models/recordModel");
const router = express_1.default.Router();
// @route   GET /api/records/
// @desc    Retrieve all item
// @access  Public
router.get("/", (req, res) => {
    recordModel_1.Record.find()
        .sort({ date: 1 })
        .then((item) => res.json(item));
});
// @route   GET /api/records/:id
// @desc    Retrieve all item
// @access  Public
router.get("/:_id", (req, res) => {
    recordModel_1.Record.findById(req.params._id)
        .then((item) => res.json(item))
        .catch((err) => res.json(err));
});
// @route   POST /api/records/
// @desc    Create new Item
// @access  Public
router.post("/", (req, res) => {
    console.log(req.body);
    const newItem = new recordModel_1.Record(req.body);
    newItem.save().then((item) => res.json(item));
});
// @route   PUT /api/records/
// @desc    Update Item by _id (Append, upset: false)
// @access  Public
router.put("/", (req, res) => {
    const { updItem, _id } = req.body;
    recordModel_1.Record.updateOne({ _id }, { $set: updItem })
        .then((updItem) => res.json(updItem))
        .catch((err) => res.json({ err }));
});
// @route   DELETE /api/records/
// @desc    Update Item by _id (Append, upset: false)
// @access  Public
router.delete("/:_id", (req, res) => {
    recordModel_1.Record.deleteOne({ _id: req.params._id })
        .then(() => res.json({ msg: "Deleted successfully" }))
        .catch((err) => res.json({ err }));
});
module.exports = router;
