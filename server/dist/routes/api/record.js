"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recordModel_1 = require("../../models/recordModel");
const router = express_1.default.Router();
// @route   GET /api/items/
// @desc    Retrieve all item
// @access  Public
router.get("/", (req, res) => {
    recordModel_1.Record.find()
        .sort({ date: 1 })
        .then((item) => res.json(item));
});
// @route   GET /api/items/:id
// @desc    Retrieve all item
// @access  Public
router.get("/:_id", (req, res) => {
    recordModel_1.Record.findById(req.params._id)
        .then((item) => res.json(item))
        .catch((err) => res.json(err));
});
// @route   POST /api/items/
// @desc    Create new Item
// @access  Public
router.post("/", (req, res) => {
    const { image, title, date, owner, description, tag, address, coordinate } = req.body;
    console.log(req.body);
    const newItem = new recordModel_1.Record({ image, title, date, owner, description, tag, address, coordinate });
    newItem.save().then((item) => res.json(item));
});
// @route   PUT /api/items/
// @desc    Update Item by _id (Append, upset: false)
// @access  Public
router.put("/", (req, res) => {
    const { updItem, _id } = req.body;
    recordModel_1.Record.updateOne({ _id }, { $set: updItem })
        .then((updItem) => res.json(updItem))
        .catch((err) => res.json({ err }));
});
// @route   DELETE /api/items/
// @desc    Update Item by _id (Append, upset: false)
// @access  Public
router.delete("/:_id", (req, res) => {
    recordModel_1.Record.deleteOne({ _id: req.params._id })
        .then(() => res.json({ msg: "Deleted successfully" }))
        .catch((err) => res.json({ err }));
});
module.exports = router;
