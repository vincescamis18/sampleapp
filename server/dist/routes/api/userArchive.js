"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userArchiveModel_1 = require("../../models/userArchiveModel");
const router = express_1.default.Router();
// @route   GET /api/user-archive/
// @desc    Retrieve all user-archive section
// @access  Public
router.get("/", (req, res) => {
    console.log("Retrieve all user-archive section"); // Debug
    userArchiveModel_1.UserArchives.find()
        .sort({ date: 1 })
        .then((item) => res.json(item));
});
// @route   GET /api/user-archive/
// @desc    Retrieve all user-archive section with record details
// @access  Public
router.get("/details-record/", (req, res) => {
    console.log("Retrieve all user-archive section with record details"); // Debug
    userArchiveModel_1.UserArchives.find()
        .populate("records.record")
        .sort({ date: 1 })
        .then((item) => res.json(item));
});
// @route   GET /api/user-archive/:id
// @desc    Retrieve specific user-archive section by id
// @access  Public
router.get("/:user_id", (req, res) => {
    const { user_id } = req.params;
    console.log("Retrieve specific user-archive section by id", req.body); // Debug
    // find specific record user-archive section and populate the records with record details
    userArchiveModel_1.UserArchives.find({ user_id })
        .then((item) => res.json(item))
        .catch((err) => res.json(err));
});
// @route   GET /api/user-archive/:id
// @desc    Retrieve specific user-archive section with record details by id
// @access  Public
router.get("/details-record/:user_id", (req, res) => {
    const { user_id } = req.params;
    console.log("Retrieve specific user-archive section with record details by id", req.body); // Debug
    // find specific record user-archive section and populate the records with record details
    userArchiveModel_1.UserArchives.find({ user_id })
        .populate("records.record")
        .then((item) => res.json(item))
        .catch((err) => res.json(err));
});
// @route   POST /api/user-archive/
// @desc    Create an instance of the record's user-archive section
// @access  Public
router.post("/", (req, res) => {
    const { user_id } = req.body;
    console.log("Create an instance of the record's user-archive section", req.body); // Debug
    // Checking for missing field
    if (!user_id)
        return res.status(400).json({ error: "Missing field", user_id });
    userArchiveModel_1.UserArchives.findOne({ user_id })
        .then((user_id) => {
        // Checks if the user has an existing archive
        if (user_id)
            return res.status(400).json({ err: "user already have an archive" });
        // create an instance of the record's user-archive section
        const newItem = new userArchiveModel_1.UserArchives({ user_id, records: [] });
        newItem.save().then((item) => res.json(item));
    })
        .catch((err) => res.json(err));
});
// @route	POST /api/user-archive
// @desc	Append record to user-archive
// @access	Public
router.patch("/", (req, res) => {
    const { record_id, user_id } = req.body;
    console.log("Append record to user-archive", req.body); // Debug
    // Checking for missing field
    if (!record_id || !user_id)
        return res.status(400).json({ error: "Missing field" });
    userArchiveModel_1.UserArchives.find({ records: { $elemMatch: { record: record_id } } })
        .then((record) => {
        // checking if there is an existing record
        if (record.length)
            return res.status(400).json({ error: "record already exist in archive" });
        // Append the message to record's user-archive section
        userArchiveModel_1.UserArchives.findOneAndUpdate({ user_id }, { $push: { records: { record: record_id } } })
            .then((chat) => res.json(chat))
            .catch((err) => res.json({ err }));
    })
        .catch((err) => res.json(err));
});
// @route	POST /api/user-archive
// @desc	Delete record user-archive by id
// @access	Public
router.delete("/", (req, res) => {
    const { record_id, user_id } = req.body;
    console.log("Delete record user-archive by id", req.body);
    // Checking for missing field
    if (!record_id || !user_id)
        return res.status(400).json({ error: "Missing field" });
    userArchiveModel_1.UserArchives.find({ records: { $elemMatch: { record: record_id } } })
        .then((record) => {
        // checking if there is an existing record
        if (!record.length)
            return res.status(400).json({ error: "record doesn't exist in archive" });
        userArchiveModel_1.UserArchives.findOneAndUpdate({ user_id }, { $pull: { records: { record: record_id } } }, { safe: true, multi: true })
            .then(() => res.json({ msg: "Deleted Successfully" }))
            .catch((err) => res.json(err));
    })
        .catch((err) => res.json(err));
});
module.exports = router;
