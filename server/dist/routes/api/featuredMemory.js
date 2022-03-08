"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const featuredMemoryModel_1 = require("../../models/featuredMemoryModel");
const userzModel_1 = require("../../models/userzModel");
const router = express_1.default.Router();
// @route   GET /api/featured-memory/
// @desc    Retrieve all featured-memory
// @access  Public
router.get("/", (req, res) => {
    console.log("Retrieve all featured-memory");
    featuredMemoryModel_1.FeaturedMemory.find()
        .sort({ date: 1 })
        .then((item) => res.json(item));
});
// @route   GET /api/featured-memory/
// @desc    Retrieve all featured-memory with record details
// @access  Public
router.get("/details-record/", (req, res) => {
    console.log("Retrieve all featured-memory with record details");
    featuredMemoryModel_1.FeaturedMemory.find()
        .populate("record_id")
        .sort({ date: 1 })
        .then((item) => res.json(item));
});
// @route   GET /api/featured-memory/
// @desc    Retrieve all featured-memory with record and user details
// @access  Public
router.get("/details-record-user/", (req, res) => {
    console.log("Retrieve all featured-memory with record and user details");
    featuredMemoryModel_1.FeaturedMemory.find()
        .populate("record_id")
        .sort({ date: 1 })
        .then((featuredMemory) => {
        if (featuredMemory.length > 0) {
            let count = 0;
            for (let a = 0; a < featuredMemory.length; a++) {
                userzModel_1.Users.findById(featuredMemory[a].record_id.creator)
                    .select("_id surname given_name user_profile")
                    .then((user) => {
                    count++;
                    featuredMemory[a].record_id.creator = user;
                    if (count == featuredMemory.length)
                        res.json(featuredMemory);
                });
            }
        }
    });
});
// @route   GET /api/featured-memory/:id
// @desc    Retrieve featured-memory by id
// @access  Public
router.get("/:_id", (req, res) => {
    console.log("Retrieve featured-memory by id", req.params._id);
    featuredMemoryModel_1.FeaturedMemory.findById(req.params._id)
        .then((item) => res.json(item))
        .catch((err) => res.json(err));
});
// @route   GET /api/featured-memory/:id
// @desc    Retrieve featured-memory by id with record details
// @access  Public
router.get("/details-record/:_id", (req, res) => {
    console.log("Retrieve featured-memory by id with record details", req.params._id);
    featuredMemoryModel_1.FeaturedMemory.findById(req.params._id)
        .populate("record_id")
        .then((item) => res.json(item))
        .catch((err) => res.json(err));
});
// @route   POST /api/featured-memory/
// @desc    Add featured-memory
// @access  Public
router.post("/", (req, res) => {
    const newItem = new featuredMemoryModel_1.FeaturedMemory(req.body);
    console.log("Add featured-memory", req.body);
    newItem
        .save()
        .then((item) => res.json(item))
        .catch((item) => res.json(item));
});
// @route   PUT /api/featured-memory/
// @desc    Update featured-memory by _id
// @access  Public
router.put("/", (req, res) => {
    const { updItem, _id } = req.body;
    console.log("Update featured-memory by _id", req.body);
    featuredMemoryModel_1.FeaturedMemory.updateOne({ _id }, { $set: updItem })
        .then(() => res.json({ msg: "Updated successfully", updItem }))
        .catch((err) => res.json({ err }));
});
// @route   DELETE /api/featured-memory/
// @desc    Delete featured-memory by _id
// @access  Public
router.delete("/:_id", (req, res) => {
    console.log("Delete featured-memory by _id", req.params);
    featuredMemoryModel_1.FeaturedMemory.deleteOne({ _id: req.params._id })
        .then(() => res.json({ msg: "Deleted successfully" }))
        .catch((err) => res.json({ err }));
});
module.exports = router;
