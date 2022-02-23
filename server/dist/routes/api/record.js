"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recordModel_1 = require("../../models/recordModel");
const commentModel_1 = require("../../models/commentModel");
const router = express_1.default.Router();
// @route   GET /api/records/
// @desc    Retrieve all record
// @access  Public
router.get("/", (req, res) => {
    recordModel_1.Record.find()
        .sort({ date: 1 })
        .then((item) => res.json(item));
});
// @route   GET /api/records/record-creator
// @desc    Retrieve all record with creator details
// @access  Public
router.get("/record-creator", (req, res) => {
    recordModel_1.Record.find()
        .populate("creator", ["surname", "given_name", "user_profile"])
        .sort({ date: 1 })
        .then((item) => res.json(item));
});
// @route   GET /api/records/user/:id
// @desc    Retrieve all records of user by id
// @access  Public
router.get("/user/:creator", (req, res) => {
    recordModel_1.Record.find({ creator: req.params.creator })
        .then((item) => res.json(item))
        .catch((err) => res.json(err));
});
// @route   GET /api/records/user/:id
// @desc    Retrieve all records of user by id with creator details
// @access  Public
router.get("/record-creator/user/:creator", (req, res) => {
    recordModel_1.Record.find({ creator: req.params.creator })
        .populate("creator", ["surname", "given_name", "user_profile"])
        .sort({ date: 1 })
        .then((item) => res.json(item))
        .catch((err) => res.json(err));
});
// @route   GET /api/records/:id
// @desc    Retrieve specific record by id
// @access  Public
router.get("/:_id", (req, res) => {
    recordModel_1.Record.findById(req.params._id)
        .then((item) => res.json(item))
        .catch((err) => res.json(err));
});
// @route   POST /api/records/
// @desc    Create new record
// @access  Public
router.post("/", (req, res) => {
    console.log(req.body);
    // create a new record instance
    const newRecord = new recordModel_1.Record(req.body);
    newRecord
        .save()
        .then((record) => {
        // create a comment section instance
        const newComment = new commentModel_1.Comment({ record_id: record._id, comments: [] });
        newComment
            .save()
            .then(() => res.json(record))
            .catch((err) => res.json(err));
    })
        .catch((err) => res.json(err));
});
// @route   PUT /api/records/
// @desc    Update record by _id
// @access  Public
router.put("/", (req, res) => {
    const { updItem, _id } = req.body;
    recordModel_1.Record.updateOne({ _id }, { $set: updItem })
        .then((updItem) => res.json(updItem))
        .catch((err) => res.json({ err }));
});
// @route   DELETE /api/records/
// @desc    Delete record by _id
// @access  Public
router.delete("/:_id", (req, res) => {
    recordModel_1.Record.deleteOne({ _id: req.params._id })
        .then(() => res.json({ msg: "Deleted successfully" }))
        .catch((err) => res.json({ err }));
});
module.exports = router;
