import express, { Request, Response } from "express";
import { Users, IUsers } from "../../models/userzModel";
const auth = require("../../middlewares/authentication");

const router = express.Router();

// @route   GET /api/userz/
// @desc    Retrieve all item
// @access  Public
router.get("/", (req: Request, res: Response) => {
	Users.find()
		.sort({ date: 1 })
		.then((item: IUsers[]) => res.json(item));
});

// @route   GET /api/userz/
// @desc    Retrieve all item
// @access  Public
router.get("/details/:_id", (req: Request, res: Response) => {
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
// @desc    Create new Item
// @access  Public
router.post("/", (req, res) => {
	console.log(req.body);
	const newItem = new Users(req.body);
	newItem.save().then((item: any) => res.json(item));
});

// @route   PUT /api/userz/
// @desc    Update Item by _id (Append, upset: false)
// @access  Public
router.put("/", (req: Request, res: Response) => {
	const { updItem, _id } = req.body;
	Users.updateOne({ _id }, { $set: updItem })
		.then((updItem: any) => res.json(updItem))
		.catch((err: any) => res.json({ err }));
});

// @route   DELETE /api/userz/
// @desc    Update Item by _id (Append, upset: false)
// @access  Public
router.delete("/:_id", (req: Request, res: Response) => {
	Users.deleteOne({ _id: req.params._id })
		.then(() => res.json({ msg: "Deleted successfully" }))
		.catch((err: any) => res.json({ err }));
});

// @route   GET /api/userz/data
// @dessc   Get user data by ID
// @access  Private
router.get("/data", auth, (req: any, res: Response) => {
	Users.findById(req.user.id)
		.then((user: IUsers) => {
			console.log("user 101", user);
			res.status(200).json({ user });
		})
		.catch((err: any) => res.json({ err }));
});

// @route   GET /api/userz/data
// @dessc   Get user data by ID
// @access  Private
router.get("/verifyToken", auth, (req: any, res: Response) => {
	Users.findById(req.user.id)
		.then(() => res.status(200).json({ isTokenValid: true }))
		.catch((err: any) => res.status(401).json({ err }));
});

module.exports = router;
