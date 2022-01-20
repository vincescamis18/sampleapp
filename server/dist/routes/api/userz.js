"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userzModel_1 = require("../../models/userzModel");
const router = express_1.default.Router();
// @route   GET /api/userz/
// @desc    Retrieve all item
// @access  Public
router.get("/", (req, res) => {
    userzModel_1.Userz.find()
        .sort({ date: 1 })
        .then((item) => res.json(item));
});
// @route   GET /api/userz/:id
// @desc    Retrieve all item
// @access  Public
router.get("/:_id", (req, res) => {
    userzModel_1.Userz.findById(req.params._id)
        .then((item) => res.json(item))
        .catch((err) => res.json(err));
});
// @route   POST /api/userz/
// @desc    Create new Item
// @access  Public
router.post("/", (req, res) => {
    console.log(req.body);
    const newItem = new userzModel_1.Userz(req.body);
    newItem.save().then((item) => res.json(item));
});
// @route   PUT /api/userz/
// @desc    Update Item by _id (Append, upset: false)
// @access  Public
router.put("/", (req, res) => {
    const { updItem, _id } = req.body;
    userzModel_1.Userz.updateOne({ _id }, { $set: updItem })
        .then((updItem) => res.json(updItem))
        .catch((err) => res.json({ err }));
});
// @route   DELETE /api/userz/
// @desc    Update Item by _id (Append, upset: false)
// @access  Public
router.delete("/:_id", (req, res) => {
    userzModel_1.Userz.deleteOne({ _id: req.params._id })
        .then(() => res.json({ msg: "Deleted successfully" }))
        .catch((err) => res.json({ err }));
});
module.exports = router;
