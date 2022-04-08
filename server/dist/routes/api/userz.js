"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userzModel_1 = require("../../models/userzModel");
const recordModel_1 = require("../../models/recordModel");
const auth = require("../../middlewares/authentication");
const router = express_1.default.Router();
// @route   GET /api/userz/
// @desc    Retrieve all user
// @access  Public
router.get("/", (req, res) => {
    console.log("Retrieve all user"); // Debug
    userzModel_1.Users.find()
        .sort({ date: 1 })
        .then((item) => res.json(item));
});
// @route   GET /api/userz/rank
// @desc    Retrieve all user by rank
// @access  Public
router.get("/rank", (req, res) => {
    console.log("Retrieve all user by rank"); // Debug
    // Retrieve all users
    userzModel_1.Users.find()
        .select("user_profile given_name surname location")
        .sort({ given_name: 1 })
        .then((users) => {
        let updateUsersWithRecord = [];
        let totalUsers = users.length;
        let count = 0;
        // Retrieve each user's record count
        users.forEach((user) => {
            recordModel_1.Record.find({ creator: user._id })
                .then((record) => {
                count++;
                const { _id, given_name, surname, user_profile, location } = user;
                updateUsersWithRecord.push({ _id, given_name, surname, user_profile, location, post: record.length });
                if (count == totalUsers) {
                    updateUsersWithRecord.sort((a, b) => b.post - a.post);
                    res.json({ users: updateUsersWithRecord });
                }
            })
                .catch((err) => res.json(err));
        });
    });
});
// @route   GET /api/userz/
// @desc    Retrieve specific user by id
// @access  Public
router.get("/details/:_id", (req, res) => {
    console.log("Retrieve specific user by id"); // Debug
    userzModel_1.Users.findById(req.params._id)
        .select("given_name surname location bio birthday user_profile")
        .then((item) => res.json(item));
});
// // @route   GET /api/userz/:id
// // @desc    Retrieve all item
// // @access  Public
// router.get("/:_id", (req: Request, res: Response) => {
// 	Users.findById(req.params._id)
// 		.then((item: IUsers) => res.json(item))
// 		.catch((err: any) => res.json(err));
// });
// @route   POST /api/userz/
// @desc    Create new user
// @access  Public
router.post("/", (req, res) => {
    console.log("Create new user", req.body); // Debug
    console.log(req.body);
    const newItem = new userzModel_1.Users(req.body);
    newItem.save().then((item) => res.json(item));
});
// @route   PUT /api/userz/
// @desc    Update user by id
// @access  Public
router.put("/", (req, res) => {
    const { updItem, _id } = req.body;
    console.log("Update user by id", req.body); // Debug
    userzModel_1.Users.updateOne({ _id }, { $set: updItem })
        .then((updItem) => res.json(updItem))
        .catch((err) => res.json({ err }));
});
// @route   DELETE /api/userz/
// @desc    Delete user by id
// @access  Public
router.delete("/:_id", (req, res) => {
    console.log("Delete user by id", req.params._id); // Debug
    userzModel_1.Users.deleteOne({ _id: req.params._id })
        .then(() => res.json({ msg: "Deleted successfully" }))
        .catch((err) => res.json({ err }));
});
// @route   GET /api/userz/data
// @dessc   Get user data using token
// @access  Private
router.get("/data", auth, (req, res) => {
    console.log("Get user data using token", req.user.id); // Debug
    userzModel_1.Users.findById(req.user.id)
        .then((user) => {
        console.log("user 101", user);
        res.status(200).json({ user });
    })
        .catch((err) => res.json({ err }));
});
// @route   GET /api/userz/data
// @dessc   Verify user token
// @access  Private
router.get("/verifyToken", auth, (req, res) => {
    console.log("Verify user token", req.user.id); // Debug
    userzModel_1.Users.findById(req.user.id)
        .then(() => res.status(200).json({ isTokenValid: true }))
        .catch((err) => res.status(401).json({ err }));
});
module.exports = router;
