import express, { Request, Response, Errback } from "express";
import { UserAccess, IUserAccess } from "../../models/userAccessModel";
const auth = require("../../middlewares/authentication");

const router = express.Router();

// @route   GET /api/user-access/
// @desc    Retrieve all user-access
// @access  Public
router.get("/", (req: Request, res: Response) => {
	console.log("Retrieve all user-access");

	UserAccess.find()
		.sort({ date: 1 })
		.then((item: IUserAccess) => res.json(item));
});

// @route   GET /api/user-access/
// @desc    Retrieve all user-access with user details
// @access  Public
router.get("/details-user/", (req: Request, res: Response) => {
	console.log("Retrieve all user-access with user details", req.user); // Debug

	UserAccess.find()
		.populate("user_id")
		.sort({ date: 1 })
		.then((item: IUserAccess) => res.json(item));
});

// @route   GET /api/token/
// @desc    Retrieve user-access by token
// @access  Public
router.get("/token/", auth, (req: any, res: Response) => {
	console.log("Retrieve user-access by token", req.user); // Debug

	UserAccess.find({ user_id: req.user.id })
		.then((item: IUserAccess) => res.json(item))
		.catch((err: Errback) => res.json(err));
});

// @route   GET /api/user-access/:id
// @desc    Retrieve user-access by id
// @access  Public
router.get("/:_id", (req: Request, res: Response) => {
	console.log("Retrieve user-access by id", req.params._id); // Debug

	UserAccess.findById(req.params._id)
		.then((item: IUserAccess) => res.json(item))
		.catch((err: Errback) => res.json(err));
});

// @route   GET /api/user-access/:id
// @desc    Retrieve user-access with user details by id
// @access  Public
router.get("/details-user/:_id", (req: Request, res: Response) => {
	console.log("Retrieve user-access with user details by id", req.params._id); // Debug

	UserAccess.findById(req.params._id)
		.populate("user_id")
		.then((item: IUserAccess) => res.json(item))
		.catch((err: Errback) => res.json(err));
});

// @route   POST /api/user-access/
// @desc    Add user-access
// @access  Public
router.post("/", (req, res) => {
	const { user_id, user_access } = req.body;
	console.log("Add user-access", req.body); // Debug

	if (!user_id || !user_access) return res.status(400).json({ error: "Missing field" });

	UserAccess.find({ user_id, user_access })
		.then((user: any) => {
			if (user.length > 0) return res.status(400).json({ error: "User already have the access" });

			const newItem = new UserAccess(req.body);
			newItem
				.save()
				.then((item: IUserAccess) => res.json(item))
				.catch((item: Errback) => res.json(item));
		})
		.catch((item: Errback) => res.json(item));
});

// @route   PUT /api/user-access/
// @desc    Update user-access by _id
// @access  Public
router.put("/", (req: Request, res: Response) => {
	const { updItem, _id } = req.body;
	console.log("Update user-access by _id", req.body); // Debug

	if (!_id || !updItem) return res.status(400).json({ error: "Missing field" });

	UserAccess.find({ _id })
		.then((userAccess: any) => {
			if (userAccess.length < 1) return res.status(400).json({ error: "the given user with access doesn't exist" });

			UserAccess.updateOne({ _id }, { $set: updItem })
				.then(() => res.json({ msg: "Updated successfully", updItem }))
				.catch((err: Errback) => res.json({ err }));
		})
		.catch((err: Errback) => res.json({ err }));
});

// @route   DELETE /api/user-access/
// @desc    Delete user-access by _id
// @access  Public
router.delete("/", (req: Request, res: Response) => {
	const { user_id, user_access } = req.body;
	console.log("Delete user-access", req.params); // Debug

	if (!user_id || !user_access) return res.status(400).json({ error: "Missing field" });

	UserAccess.find({ user_id, user_access })
		.then((userAccess: any) => {
			if (userAccess.length < 1) return res.status(400).json({ error: "the given user with access doesn't exist" });

			UserAccess.deleteOne({ user_id, user_access })
				.then(() => res.json({ msg: "Deleted successfully" }))
				.catch((err: Errback) => res.json({ err }));
		})
		.catch((err: Errback) => res.json({ err }));
});

module.exports = router;
