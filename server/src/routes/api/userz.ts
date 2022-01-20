import express, { Request, Response } from "express";
import { Userz, IUserz } from "../../models/userzModel";

const router = express.Router();

// @route   GET /api/userz/
// @desc    Retrieve all item
// @access  Public
router.get("/", (req: Request, res: Response) => {
	Userz.find()
		.sort({ date: 1 })
		.then((item: IUserz[]) => res.json(item));
});

// @route   GET /api/userz/:id
// @desc    Retrieve all item
// @access  Public
router.get("/:_id", (req: Request, res: Response) => {
	Userz.findById(req.params._id)
		.then((item: IUserz) => res.json(item))
		.catch((err: any) => res.json(err));
});

// @route   POST /api/userz/
// @desc    Create new Item
// @access  Public
router.post("/", (req, res) => {
	console.log(req.body);
	const newItem = new Userz(req.body);
	newItem.save().then((item: any) => res.json(item));
});

// @route   PUT /api/userz/
// @desc    Update Item by _id (Append, upset: false)
// @access  Public
router.put("/", (req: Request, res: Response) => {
	const { updItem, _id } = req.body;
	Userz.updateOne({ _id }, { $set: updItem })
		.then((updItem: any) => res.json(updItem))
		.catch((err: any) => res.json({ err }));
});

// @route   DELETE /api/userz/
// @desc    Update Item by _id (Append, upset: false)
// @access  Public
router.delete("/:_id", (req: Request, res: Response) => {
	Userz.deleteOne({ _id: req.params._id })
		.then(() => res.json({ msg: "Deleted successfully" }))
		.catch((err: any) => res.json({ err }));
});

module.exports = router;
