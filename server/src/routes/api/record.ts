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

// @route   GET /api/records/record-creator
// @desc    Retrieve all record with creator details
// @access  Public
router.get("/record-creator", (req: Request, res: Response) => {
	Record.find()
		.populate("creator", ["surname", "given_name", "user_profile"])
		.sort({ date: 1 })
		.then((item: IRecord[]) => res.json(item));
});

// @route   GET /api/records/record-creator
// @desc    Retrieve all record with creator details
// @access  Public
router.get("/record-creator/:_id", (req: Request, res: Response) => {
	const { _id } = req.params;
	Record.findById(_id)
		.populate("creator", ["surname", "given_name", "user_profile"])
		.sort({ date: 1 })
		.then((item: IRecord[]) => res.json(item));
});

// @route   GET /api/records/user/:id
// @desc    Retrieve all records of user by id
// @access  Public
router.get("/user/:creator", (req: Request, res: Response) => {
	Record.find({ creator: req.params.creator })
		.then((item: IRecord[]) => res.json(item))
		.catch((err: any) => res.json(err));
});

// @route   GET /api/records/record-creator/user/:id
// @desc    Retrieve all records of user by id with creator details
// @access  Public
router.get("/record-creator/user/:creator", (req: Request, res: Response) => {
	Record.find({ creator: req.params.creator })
		.populate("creator", ["surname", "given_name", "user_profile"])
		.sort({ date: 1 })
		.then((item: IRecord[]) => res.json(item))
		.catch((err: any) => res.json(err));
});

// @route   GET /api/records/record-count/user/:id
// @desc    Get the number of record posted by user
// @access  Public
router.get("/record-count/user/:creator", (req: Request, res: Response) => {
	Record.find({ creator: req.params.creator })
		.then((item: IRecord[]) => res.json({ count: item.length }))
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

// @route   GET /api/records/search/
// @desc    Get all record with no search filter
// @access  Public
router.get("/search/title/", (req: Request, res: Response) => {
	const { word } = req.params;
	Record.find()
		.sort({ date: 1 })
		.populate("creator", ["surname", "given_name", "user_profile"])
		.then((item: IRecord[]) => res.json(item));
});

// @route   GET /api/records/search/:word
// @desc    Filter record by title
// @access  Public
router.get("/search/title/:word", (req: Request, res: Response) => {
	const { word } = req.params;
	Record.find()
		.sort({ date: 1 })
		.populate("creator", ["surname", "given_name", "user_profile"])
		.then((item: IRecord[]) => {
			// filter the title that has the search word on it
			const filteredRecord: IRecord[] = [];
			item.forEach(item => {
				if (item.title.toLocaleLowerCase().includes(word.toLocaleLowerCase())) filteredRecord.push(item);
			});
			res.json(filteredRecord);
		});
});

// @route   GET /api/records/filter/location/:word
// @desc    Filter record by location
// @access  Public
router.get("/filter/location/:word", (req: Request, res: Response) => {
	const { word } = req.params;
	console.log("Filter record by location", word);

	if (!word) return res.json({ err: "Missing field" });

	Record.find()
		.sort({ date: 1 })
		.populate("creator", ["surname", "given_name", "user_profile"])
		.then((item: IRecord[]) => {
			// filter the title that has the search word on it
			const filteredRecord: IRecord[] = [];
			item.forEach(item => {
				if (item.address.toLocaleLowerCase().includes(word.toLocaleLowerCase())) filteredRecord.push(item);
			});

			res.json(filteredRecord);
		})
		.catch((err: Errback) => res.json(err));
});

// @route   GET /api/records/filter/date-start/:date
// @desc    Filter record by startDate and endDate
// @access  Public
router.get("/filter/date/:startDate/:endDate", (req: Request, res: Response) => {
	const { startDate, endDate } = req.params;
	console.log("Filter record by startDate and endDate", startDate, endDate);

	if (!startDate || !endDate) return res.json({ err: "Missing field" });

	Record.find({ date: { $gte: startDate, $lte: endDate } })
		.sort({ date: 1 })
		.populate("creator", ["surname", "given_name", "user_profile"])
		.then((featuredMemory: any) => res.json(featuredMemory))
		.catch((err: Errback) => res.json(err));
});

// @route   GET /api/records/filter/tag/:word
// @desc    Filter record by tag
// @access  Public
router.get("/filter/tag/:word", (req: Request, res: Response) => {
	const { word } = req.params;
	console.log("Filter record by tag", word);

	if (!word) return res.json({ err: "Missing field" });

	Record.find()
		.sort({ date: 1 })
		.populate("creator", ["surname", "given_name", "user_profile"])
		.then((item: IRecord[]) => {
			// filter the title that has the search word on it
			const filteredRecord: IRecord[] = [];
			item.forEach(item => {
				if (item.tag.toLocaleLowerCase().includes(word.toLocaleLowerCase())) filteredRecord.push(item);
			});

			res.json(filteredRecord);
		})
		.catch((err: Errback) => res.json(err));
});

// @route   GET /api/records/filter/description/:word
// @desc    Filter record by description
// @access  Public
router.get("/filter/description/:word", (req: Request, res: Response) => {
	const { word } = req.params;
	console.log("Filter record by description", word);

	if (!word) return res.json({ err: "Missing field" });

	Record.find()
		.sort({ date: 1 })
		.populate("creator", ["surname", "given_name", "user_profile"])
		.then((item: IRecord[]) => {
			// filter the title that has the search word on it
			const filteredRecord: IRecord[] = [];
			item.forEach(item => {
				if (item.description.toLocaleLowerCase().includes(word.toLocaleLowerCase())) filteredRecord.push(item);
			});

			res.json(filteredRecord);
		})
		.catch((err: Errback) => res.json(err));
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
