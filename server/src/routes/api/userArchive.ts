import express, { Request, Response, Errback } from "express";
import { UserArchives, IUserArchives } from "../../models/userArchiveModel";

const router = express.Router();

// @route   GET /api/user-archive/
// @desc    Retrieve all user-archive section
// @access  Public
router.get("/", (req: Request, res: Response) => {
	console.log("Retrieve all user-archive section"); // Debug

	UserArchives.find()
		.sort({ date: 1 })
		.then((item: any) => res.json(item));
});

// @route   GET /api/user-archive/
// @desc    Retrieve all user-archive section with record details
// @access  Public
router.get("/details-record/", (req: Request, res: Response) => {
	console.log("Retrieve all user-archive section with record details"); // Debug

	UserArchives.find()
		.populate("records.record")
		.sort({ date: 1 })
		.then((item: any) => res.json(item));
});

// @route   GET /api/user-archive/:id
// @desc    Retrieve specific user-archive section by id
// @access  Public
router.get("/:user_id", (req: Request, res: Response) => {
	const { user_id } = req.params;
	console.log("Retrieve specific user-archive section by id", req.body); // Debug

	// find specific record user-archive section and populate the records with record details
	UserArchives.find({ user_id })
		.then((item: IUserArchives) => res.json(item))
		.catch((err: Errback) => res.json(err));
});

// @route   GET /api/user-archive/:id
// @desc    Retrieve specific user-archive section with record details by id
// @access  Public
router.get("/details-record/:user_id", (req: Request, res: Response) => {
	const { user_id } = req.params;
	console.log("Retrieve specific user-archive section with record details by id", req.body); // Debug

	// find specific record user-archive section and populate the records with record details
	UserArchives.find({ user_id })
		.populate("records.record")
		.then((item: IUserArchives) => res.json(item))
		.catch((err: Errback) => res.json(err));
});

// @route   POST /api/user-archive/
// @desc    Create an instance of the record's user-archive section
// @access  Public
router.post("/", (req, res) => {
	const { user_id } = req.body;
	console.log("Create an instance of the record's user-archive section", req.body); // Debug

	// Checking for missing field
	if (!user_id) return res.status(400).json({ error: "Missing field", user_id });

	UserArchives.findOne({ user_id })
		.then((user_id: string) => {
			// Checks if the user has an existing archive
			if (user_id) return res.status(400).json({ err: "user already have an archive" });

			// create an instance of the record's user-archive section
			const newItem = new UserArchives({ user_id, records: [] });
			newItem.save().then((item: Errback) => res.json(item));
		})
		.catch((err: Errback) => res.json(err));
});

// @route	POST /api/user-archive
// @desc	Append record to user-archive
// @access	Public
router.patch("/", (req, res) => {
	const { record_id, user_id } = req.body;
	console.log("Append record to user-archive", req.body); // Debug

	// Checking for missing field
	if (!record_id || !user_id) return res.status(400).json({ error: "Missing field" });

	UserArchives.find({ records: { $elemMatch: { record: record_id } } })
		.then((record: string) => {
			// checking if there is an existing record
			if (record.length) return res.status(400).json({ error: "record already exist in archive" });

			// Append the message to record's user-archive section
			UserArchives.findOneAndUpdate({ user_id }, { $push: { records: { record: record_id } } })
				.then((chat: any) => res.json(chat))
				.catch((err: Errback) => res.json({ err }));
		})
		.catch((err: Errback) => res.json(err));
});

// @route	POST /api/user-archive
// @desc	Delete record user-archive by id
// @access	Public
router.delete("/", (req, res) => {
	const { record_id, user_id } = req.body;
	console.log("Delete record user-archive by id", req.body);

	// Checking for missing field
	if (!record_id || !user_id) return res.status(400).json({ error: "Missing field" });

	UserArchives.find({ records: { $elemMatch: { record: record_id } } })
		.then((record: string) => {
			// checking if there is an existing record
			if (!record.length) return res.status(400).json({ error: "record doesn't exist in archive" });

			UserArchives.findOneAndUpdate({ user_id }, { $pull: { records: { record: record_id } } }, { safe: true, multi: true })
				.then(() => res.json({ msg: "Deleted Successfully" }))
				.catch((err: Errback) => res.json(err));
		})
		.catch((err: Errback) => res.json(err));
});

module.exports = router;
