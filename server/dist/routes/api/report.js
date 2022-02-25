"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reportModel_1 = require("../../models/reportModel");
const auth = require("../../middlewares/authentication");
const router = express_1.default.Router();
// @route   GET /api/report/
// @desc    Retrieve all report
// @access  Public
router.get("/", (req, res) => {
    reportModel_1.Report.find()
        .sort({ date: 1 })
        .then((item) => res.json(item));
});
// @route   GET /api/report/:id
// @desc    Retrieve report by id
// @access  Public
router.get("/:_id", (req, res) => {
    reportModel_1.Report.findById(req.params._id)
        .then((item) => res.json(item))
        .catch((err) => res.json(err));
});
// @route   POST /api/report/
// @desc    Create new report
// @access  Public
router.post("/", (req, res) => {
    console.log(req.body);
    const newItem = new reportModel_1.Report(Object.assign(Object.assign({}, req.body), { status: "pending" }));
    newItem.save().then((item) => res.json(item));
});
// @route   PUT /api/report/
// @desc    Update report by _id
// @access  Public
router.put("/", (req, res) => {
    const { updItem, _id } = req.body;
    reportModel_1.Report.updateOne({ _id }, { $set: updItem })
        .then((updItem) => res.json(updItem))
        .catch((err) => res.json({ err }));
});
// @route   DELETE /api/report/
// @desc    Delete report by _id
// @access  Public
router.delete("/:_id", (req, res) => {
    reportModel_1.Report.deleteOne({ _id: req.params._id })
        .then(() => res.json({ msg: "Deleted successfully" }))
        .catch((err) => res.json({ err }));
});
module.exports = router;
