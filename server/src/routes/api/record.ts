import express, { Request, Response, Errback } from "express";
import { Record, IRecord } from "../../models/recordModel";
import { Comment } from "../../models/commentModel";

const router = express.Router();

// @route   GET /api/records/
// @desc    Retrieve all record
// @access  Public
router.get("/", (req: Request, res: Response) => {
	Record.find()
		.sort({ date: 1 })
		.then((item: IRecord[]) => res.json(item));
});

// @route   GET /api/records/user/:id
// @desc    Retrieve record by creator id
// @access  Public
router.get("/user/:creator", (req: Request, res: Response) => {
	Record.find({ creator: req.params.creator })
		.then((item: IRecord[]) => res.json(item))
		.catch((err: any) => res.json(err));
});

// @route   GET /api/records/:id
// @desc    Retrieve specific record by id
// @access  Public
router.get("/:_id", (req: Request, res: Response) => {
	Record.findById(req.params._id)
		.then((item: IRecord) => res.json(item))
		.catch((err: any) => res.json(err));
});

// @route   POST /api/records/
// @desc    Create new record
// @access  Public
router.post("/", (req, res) => {
	console.log(req.body);
	// create a new record instance
	const newRecord = new Record(req.body);
	newRecord
		.save()
		.then((record: any) => {
			// create a comment section instance
			const newComment = new Comment({ record_id: record._id, comments: [] });
			newComment
				.save()
				.then(() => res.json(record))
				.catch((err: Errback) => res.json(err));
		})
		.catch((err: Errback) => res.json(err));
});

// @route   PUT /api/records/
// @desc    Update record by _id
// @access  Public
router.put("/", (req: Request, res: Response) => {
	const { updItem, _id } = req.body;
	Record.updateOne({ _id }, { $set: updItem })
		.then((updItem: any) => res.json(updItem))
		.catch((err: any) => res.json({ err }));
});

// @route   DELETE /api/records/
// @desc    Delete record by _id
// @access  Public
router.delete("/:_id", (req: Request, res: Response) => {
	Record.deleteOne({ _id: req.params._id })
		.then(() => res.json({ msg: "Deleted successfully" }))
		.catch((err: any) => res.json({ err }));
});

module.exports = router;
