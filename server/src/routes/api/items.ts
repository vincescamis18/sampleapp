import express, { Request, Response } from "express";
import { Item, IItem } from "../../models/itemModel";

const router = express.Router();

// @route   GET /api/items/
// @desc    Retrieve all item
// @access  Public
router.get("/", (req: Request, res: Response) => {
	Item.find()
		.sort({ date: 1 })
		.then((item: IItem[]) => res.json(item));
});

// @route   GET /api/items/:id
// @desc    Retrieve all item
// @access  Public
router.get("/:_id", (req: Request, res: Response) => {
	Item.findById(req.params._id)
		.then((item: IItem) => res.json(item))
		.catch((err: any) => res.json(err));
});

// @route   POST /api/items/
// @desc    Create new Item
// @access  Public
router.post("/", (req, res) => {
	const { name, price } = req.body;
	const newItem = new Item({ name, price });
	newItem.save().then((item: any) => res.json(item));
});

// @route   PUT /api/items/
// @desc    Update Item by _id (Append, upset: false)
// @access  Public
router.put("/", (req: Request, res: Response) => {
	const { updItem, _id } = req.body;
	Item.updateOne({ _id }, { $set: updItem })
		.then((updItem: any) => res.json(updItem))
		.catch((err: any) => res.json({ err }));
});

// @route   DELETE /api/items/
// @desc    Update Item by _id (Append, upset: false)
// @access  Public
router.delete("/:_id", (req: Request, res: Response) => {
	Item.deleteOne({ _id: req.params._id })
		.then(() => res.json({ msg: "Deleted successfully" }))
		.catch((err: any) => res.json({ err }));
});

module.exports = router;
