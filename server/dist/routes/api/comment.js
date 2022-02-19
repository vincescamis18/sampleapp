"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentModel_1 = require("../../models/commentModel");
const auth = require("../../middlewares/authentication");
const router = express_1.default.Router();
// @route   GET /api/comment/
// @desc    Retrieve all comment section
// @access  Public
router.get("/", (req, res) => {
    commentModel_1.Comment.find()
        .sort({ date: 1 })
        .then((item) => {
        console.log("item", item, item.comments);
        res.json(item);
    });
});
// @route   GET /api/comment/:id
// @desc    Retrieve specific comment section by id
// @access  Public
router.get("/:record_id", (req, res) => {
    const { record_id } = req.params;
    // find specific record comment section and populate the user with user details
    commentModel_1.Comment.find({ record_id })
        .populate("comments.user_id", ["surname", "given_name", "user_profile"])
        .then((item) => res.json(item))
        .catch((err) => res.json(err));
});
// @route   POST /api/comment/
// @desc    Create an instance of the record's comment section
// @access  Public
router.post("/", (req, res) => {
    const { record_id } = req.body;
    // Checking for missing field
    if (!record_id)
        res.status(400).json({ error: "Missing field" });
    // create an instance of the record's comment section
    const newItem = new commentModel_1.Comment({ record_id, comments: [] });
    newItem.save().then((item) => res.json(item));
});
// @route	POST /api/comment
// @desc	Append comment messages
// @access	Public
router.patch("/", (req, res) => {
    const { record_id, user_id, message } = req.body;
    // Checking for missing field
    if (!record_id || !user_id || !message)
        res.status(400).json({ error: "Missing field" });
    // Append the message to record's comment section
    commentModel_1.Comment.findOneAndUpdate({ record_id }, { $push: { comments: { user_id, message } } })
        .then((chat) => res.json(chat))
        .catch((err) => res.json({ err }));
});
module.exports = router;
