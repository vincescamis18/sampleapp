"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAccessModel_1 = require("../../models/userAccessModel");
const auth = require("../../middlewares/authentication");
const router = express_1.default.Router();
// @route   GET /api/user-access/
// @desc    Retrieve all user-access
// @access  Public
router.get("/", (req, res) => {
    console.log("Retrieve all user-access");
    userAccessModel_1.UserAccess.find()
        .sort({ date: 1 })
        .then((item) => res.json(item));
});
// @route   GET /api/user-access/
// @desc    Retrieve all user-access with user details
// @access  Public
router.get("/details-user/", (req, res) => {
    console.log("Retrieve all user-access with user details", req.user); // Debug
    userAccessModel_1.UserAccess.find()
        .populate("user_id")
        .sort({ date: 1 })
        .then((item) => res.json(item));
});
// @route   GET /api/token/
// @desc    Retrieve user-access by token
// @access  Public
router.get("/token/", auth, (req, res) => {
    console.log("Retrieve user-access by token", req.user); // Debug
    userAccessModel_1.UserAccess.find({ user_id: req.user.id })
        .then((item) => res.json(item))
        .catch((err) => res.json(err));
});
// @route   GET /api/user-access/:id
// @desc    Retrieve user-access by id
// @access  Public
router.get("/:_id", (req, res) => {
    console.log("Retrieve user-access by id", req.params._id); // Debug
    userAccessModel_1.UserAccess.findById(req.params._id)
        .then((item) => res.json(item))
        .catch((err) => res.json(err));
});
// @route   GET /api/user-access/:id
// @desc    Retrieve user-access with user details by id
// @access  Public
router.get("/details-user/:_id", (req, res) => {
    console.log("Retrieve user-access with user details by id", req.params._id); // Debug
    userAccessModel_1.UserAccess.findById(req.params._id)
        .populate("user_id")
        .then((item) => res.json(item))
        .catch((err) => res.json(err));
});
// @route   POST /api/user-access/
// @desc    Add user-access
// @access  Public
router.post("/", (req, res) => {
    const { user_id, user_access } = req.body;
    console.log("Add user-access", req.body); // Debug
    if (!user_id || !user_access)
        return res.status(400).json({ error: "Missing field" });
    userAccessModel_1.UserAccess.find({ user_id, user_access })
        .then((user) => {
        if (user.length > 0)
            return res.status(400).json({ error: "User already have the access" });
        const newItem = new userAccessModel_1.UserAccess(req.body);
        newItem
            .save()
            .then((item) => res.json(item))
            .catch((item) => res.json(item));
    })
        .catch((item) => res.json(item));
});
// @route   PUT /api/user-access/
// @desc    Update user-access by _id
// @access  Public
router.put("/", (req, res) => {
    const { updItem, _id } = req.body;
    console.log("Update user-access by _id", req.body); // Debug
    if (!_id || !updItem)
        return res.status(400).json({ error: "Missing field" });
    userAccessModel_1.UserAccess.find({ _id })
        .then((userAccess) => {
        if (userAccess.length < 1)
            return res.status(400).json({ error: "the given user with access doesn't exist" });
        userAccessModel_1.UserAccess.updateOne({ _id }, { $set: updItem })
            .then(() => res.json({ msg: "Updated successfully", updItem }))
            .catch((err) => res.json({ err }));
    })
        .catch((err) => res.json({ err }));
});
// @route   DELETE /api/user-access/
// @desc    Delete user-access by _id
// @access  Public
router.delete("/", (req, res) => {
    const { user_id, user_access } = req.body;
    console.log("Delete user-access", req.params); // Debug
    if (!user_id || !user_access)
        return res.status(400).json({ error: "Missing field" });
    userAccessModel_1.UserAccess.find({ user_id, user_access })
        .then((userAccess) => {
        if (userAccess.length < 1)
            return res.status(400).json({ error: "the given user with access doesn't exist" });
        userAccessModel_1.UserAccess.deleteOne({ user_id, user_access })
            .then(() => res.json({ msg: "Deleted successfully" }))
            .catch((err) => res.json({ err }));
    })
        .catch((err) => res.json({ err }));
});
module.exports = router;
