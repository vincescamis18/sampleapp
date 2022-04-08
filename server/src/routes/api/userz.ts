import express, { Request, Response } from "express";
import { Users, IUsers } from "../../models/userzModel";
import { Record, IRecord } from "../../models/recordModel";

const auth = require("../../middlewares/authentication");

const router = express.Router();

// @route   GET /api/userz/
// @desc    Retrieve all user
// @access  Public
router.get("/", (req: Request, res: Response) => {
	console.log("Retrieve all user"); // Debug
	Users.find()
		.sort({ date: 1 })
		.then((item: IUsers[]) => res.json(item));
});

// @route   GET /api/userz/rank
// @desc    Retrieve all user by rank
// @access  Public
router.get("/rank", (req: Request, res: Response) => {
	console.log("Retrieve all user by rank"); // Debug

	// Retrieve all users
	Users.find()
		.select("user_profile given_name surname location")
		.sort({ given_name: 1 })
		.then((users: IUsers[]) => {
			let updateUsersWithRecord: any[] = [];
			let totalUsers = users.length;
			let count = 0;

			// Retrieve each user's record count
			users.forEach((user: any) => {
				Record.find({ creator: user._id })
					.then((record: IRecord[]) => {
						count++;
						const { _id, given_name, surname, user_profile, location } = user;
						updateUsersWithRecord.push({ _id, given_name, surname, user_profile, location, post: record.length });

						if (count == totalUsers) {
							updateUsersWithRecord.sort((a, b) => b.post - a.post);
							res.json({ users: updateUsersWithRecord });
						}
					})
					.catch((err: any) => res.json(err));
			});
		});
});

// @route   GET /api/userz/
// @desc    Retrieve specific user by id
// @access  Public
router.get("/details/:_id", (req: Request, res: Response) => {
	console.log("Retrieve specific user by id"); // Debug

	Users.findById(req.params._id)
		.select("given_name surname location bio birthday user_profile")
		.then((item: IUsers[]) => res.json(item));
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
	const newItem = new Users(req.body);
	newItem.save().then((item: any) => res.json(item));
});

// @route   PUT /api/userz/
// @desc    Update user by id
// @access  Public
router.put("/", (req: Request, res: Response) => {
	const { updItem, _id } = req.body;
	console.log("Update user by id", req.body); // Debug

	Users.updateOne({ _id }, { $set: updItem })
		.then((updItem: any) => res.json(updItem))
		.catch((err: any) => res.json({ err }));
});

// @route   DELETE /api/userz/
// @desc    Delete user by id
// @access  Public
router.delete("/:_id", (req: Request, res: Response) => {
	console.log("Delete user by id", req.params._id); // Debug

	Users.deleteOne({ _id: req.params._id })
		.then(() => res.json({ msg: "Deleted successfully" }))
		.catch((err: any) => res.json({ err }));
});

// @route   GET /api/userz/data
// @dessc   Get user data using token
// @access  Private
router.get("/data", auth, (req: any, res: Response) => {
	console.log("Get user data using token", req.user.id); // Debug

	Users.findById(req.user.id)
		.then((user: IUsers) => {
			console.log("user 101", user);
			res.status(200).json({ user });
		})
		.catch((err: any) => res.json({ err }));
});

// @route   GET /api/userz/data
// @dessc   Verify user token
// @access  Private
router.get("/verifyToken", auth, (req: any, res: Response) => {
	console.log("Verify user token", req.user.id); // Debug

	Users.findById(req.user.id)
		.then(() => res.status(200).json({ isTokenValid: true }))
		.catch((err: any) => res.status(401).json({ err }));
});

module.exports = router;
