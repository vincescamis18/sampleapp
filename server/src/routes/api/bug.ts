import express, { Request, Response, Errback } from "express";
import { Bug, IBug } from "../../models/bugModel";
const auth = require("../../middlewares/authentication");

const router = express.Router();

// @route   GET /api/bug/
// @desc    Retrieve all bug
// @access  Public
router.get("/", (req: Request, res: Response) => {
	Bug.find()
		.sort({ date: 1 })
		.then((item: IBug) => res.json(item));
});

// @route   GET /api/bug/:id
// @desc    Retrieve bug by id
// @access  Public
router.get("/:_id", (req: Request, res: Response) => {
	Bug.findById(req.params._id)
		.then((item: IBug) => res.json(item))
		.catch((err: Errback) => res.json(err));
});

// @route   POST /api/bug/
// @desc    Add bug
// @access  Public
router.post("/", (req, res) => {
	console.log(req.body);
	const newItem = new Bug({ ...req.body, status: "pending" });
	newItem.save().then((item: Errback) => res.json(item));
});

// @route   PUT /api/bug/
// @desc    Update bug by _id
// @access  Public
router.put("/", (req: Request, res: Response) => {
	const { updItem, _id } = req.body;
	Bug.updateOne({ _id }, { $set: updItem })
		.then((updItem: any) => res.json(updItem))
		.catch((err: any) => res.json({ err }));
});

// @route   DELETE /api/bug/
// @desc    Delete by by _id
// @access  Public
router.delete("/:_id", (req: Request, res: Response) => {
	Bug.deleteOne({ _id: req.params._id })
		.then(() => res.json({ msg: "Deleted successfully" }))
		.catch((err: any) => res.json({ err }));
});

module.exports = router;
