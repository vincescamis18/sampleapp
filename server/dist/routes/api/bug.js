"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bugModel_1 = require("../../models/bugModel");
const auth = require("../../middlewares/authentication");
const router = express_1.default.Router();
// @route   GET /api/bug/
// @desc    Retrieve all bug
// @access  Public
router.get("/", (req, res) => {
    bugModel_1.Bug.find()
        .sort({ date: 1 })
        .then((item) => res.json(item));
});
// @route   GET /api/bug/:id
// @desc    Retrieve bug by id
// @access  Public
router.get("/:_id", (req, res) => {
    bugModel_1.Bug.findById(req.params._id)
        .then((item) => res.json(item))
        .catch((err) => res.json(err));
});
// @route   POST /api/bug/
// @desc    Add bug
// @access  Public
router.post("/", (req, res) => {
    console.log(req.body);
    const newItem = new bugModel_1.Bug(Object.assign(Object.assign({}, req.body), { status: "pending" }));
    newItem.save().then((item) => res.json(item));
});
// @route   PUT /api/bug/
// @desc    Update bug by _id
// @access  Public
router.put("/", (req, res) => {
    const { updItem, _id } = req.body;
    bugModel_1.Bug.updateOne({ _id }, { $set: updItem })
        .then((updItem) => res.json(updItem))
        .catch((err) => res.json({ err }));
});
// @route   DELETE /api/bug/
// @desc    Delete by by _id
// @access  Public
router.delete("/:_id", (req, res) => {
    bugModel_1.Bug.deleteOne({ _id: req.params._id })
        .then(() => res.json({ msg: "Deleted successfully" }))
        .catch((err) => res.json({ err }));
});
module.exports = router;
