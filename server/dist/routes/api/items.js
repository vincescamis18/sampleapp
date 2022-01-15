"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const itemModel_1 = require("../../models/itemModel");
const router = express_1.default.Router();
// @route   GET /api/items/
// @desc    Retrieve all item
// @access  Public
router.get("/", (req, res) => {
    itemModel_1.Item.find()
        .sort({ date: 1 })
        .then((item) => res.json(item));
});
// @route   GET /api/items/:id
// @desc    Retrieve all item
// @access  Public
router.get("/:_id", (req, res) => {
    itemModel_1.Item.findById(req.params._id)
        .then((item) => res.json(item))
        .catch((err) => res.json(err));
});
// @route   POST /api/items/
// @desc    Create new Item
// @access  Public
router.post("/", (req, res) => {
    const { name, price } = req.body;
    const newItem = new itemModel_1.Item({ name, price });
    newItem.save().then((item) => res.json(item));
});
// @route   PUT /api/items/
// @desc    Update Item by _id (Append, upset: false)
// @access  Public
router.put("/", (req, res) => {
    const { updItem, _id } = req.body;
    itemModel_1.Item.updateOne({ _id }, { $set: updItem })
        .then((updItem) => res.json(updItem))
        .catch((err) => res.json({ err }));
});
// @route   DELETE /api/items/
// @desc    Update Item by _id (Append, upset: false)
// @access  Public
router.delete("/:_id", (req, res) => {
    itemModel_1.Item.deleteOne({ _id: req.params._id })
        .then(() => res.json({ msg: "Deleted successfully" }))
        .catch((err) => res.json({ err }));
});
module.exports = router;
