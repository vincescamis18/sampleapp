import express, { Request, Response } from "express";
import { Record, IRecord } from "../../models/recordModel";

const router = express.Router();

// @route   GET /api/items/
// @desc    Retrieve all item
// @access  Public
router.get("/", (req: Request, res: Response) => {
	Record.find()
		.sort({ date: 1 })
		.then((item: IRecord[]) => res.json(item));
});

// @route   GET /api/items/:id
// @desc    Retrieve all item
// @access  Public
router.get("/:_id", (req: Request, res: Response) => {
	Record.findById(req.params._id)
		.then((item: IRecord) => res.json(item))
		.catch((err: any) => res.json(err));
});

// @route   POST /api/items/
// @desc    Create new Item
// @access  Public
router.post("/", (req, res) => {
	console.log(req.body);
	const newItem = new Record(req.body);
	newItem.save().then((item: any) => res.json(item));
});

// @route   PUT /api/items/
// @desc    Update Item by _id (Append, upset: false)
// @access  Public
router.put("/", (req: Request, res: Response) => {
	const { updItem, _id } = req.body;
	Record.updateOne({ _id }, { $set: updItem })
		.then((updItem: any) => res.json(updItem))
		.catch((err: any) => res.json({ err }));
});

// @route   DELETE /api/items/
// @desc    Update Item by _id (Append, upset: false)
// @access  Public
router.delete("/:_id", (req: Request, res: Response) => {
	Record.deleteOne({ _id: req.params._id })
		.then(() => res.json({ msg: "Deleted successfully" }))
		.catch((err: any) => res.json({ err }));
});

module.exports = router;
