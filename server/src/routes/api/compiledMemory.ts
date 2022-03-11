import express, { Request, Response, Errback } from "express";
import { CompiledMemory, ICompiledMemory } from "../../models/compiledMemoryModel";

const router = express.Router();

// @route   GET /api/compiled-memory/
// @desc    Retrieve all compiled-memory section
// @access  Public
router.get("/", (req: Request, res: Response) => {
	console.log("Retrieve all compiled-memory section"); // Debug

	CompiledMemory.find()
		.sort({ date: 1 })
		.then((item: ICompiledMemory) => res.json(item))
		.catch((err: Errback) => res.json(err));
});

// @route   GET /api/compiled-memory/
// @desc    Retrieve all compiled-memory section with record details
// @access  Public
router.get("/details-record/", (req: Request, res: Response) => {
	console.log("Retrieve all compiled-memory section with record details"); // Debug

	CompiledMemory.find()
		.populate("records.record")
		.sort({ date: 1 })
		.then((item: ICompiledMemory) => res.json(item))
		.catch((err: Errback) => res.json(err));
});

// @route   GET /api/compiled-memory/:id
// @desc    Retrieve specific compiled-memory section by id
// @access  Public
router.get("/:compiled_memory_id", (req: Request, res: Response) => {
	const { compiled_memory_id } = req.params;
	console.log("Retrieve specific compiled-memory section by id ", req.params); // Debug

	// find specific record compiled-memory section and populate the records with record details
	CompiledMemory.find({ _id: compiled_memory_id })
		.then((item: ICompiledMemory) => res.json(item))
		.catch((err: Errback) => res.json(err));
});

// @route   GET /api/compiled-memory/:id
// @desc    Retrieve specific compiled-memory section with record details by id
// @access  Public
router.get("/details-record/:compiled_memory_id", (req: Request, res: Response) => {
	const { compiled_memory_id } = req.params;
	console.log("Retrieve specific compiled-memory section with record details by id", req.params); // Debug

	// find specific record compiled-memory section and populate the records with record details
	CompiledMemory.find({ _id: compiled_memory_id })
		.populate("records.record")
		.then((item: ICompiledMemory) => res.json(item))
		.catch((err: Errback) => res.json(err));
});

// @route   POST /api/compiled-memory/
// @desc    Create an instance of the record's compiled-memory section
// @access  Public
router.post("/", (req, res) => {
	const { title, description, images, records, creator } = req.body;
	console.log("Create an instance of the record's compiled-memory section", req.body); // Debug

	// Checking for missing field
	if (!title && !description && !images && !records && !creator) return res.status(400).json({ error: "Missing field" });

	// create an instance of the record's compiled-memory section
	const newItem = new CompiledMemory({ title, description, images, records, creator });
	newItem
		.save()
		.then((item: ICompiledMemory) => res.json(item))
		.catch((item: Errback) => res.json(item));
});

// @route   PUT /api/compiled-memory/
// @desc    Update compiled-memory by _id
// @access  Public
router.put("/", (req: Request, res: Response) => {
	const { updItem, _id } = req.body;
	CompiledMemory.updateOne({ _id }, { $set: updItem })
		.then((updItem: any) => res.json(updItem))
		.catch((err: any) => res.json({ err }));
});

// @route	POST /api/compiled-memory
// @desc	Append compiled-memory record
// @access	Public
router.patch("/", (req, res) => {
	const { record_id, compiled_memory_id } = req.body;
	console.log("Append compiled-memory record", req.body); // Debug

	// Checking for missing field
	if (!record_id || !compiled_memory_id) return res.status(400).json({ error: "Missing field" });

	// checking if there is an existing compiled-memory
	CompiledMemory.findById(compiled_memory_id)
		.then((compiledMemory: any) => {
			// checking if there is an existing compiled-memory
			if (!compiledMemory) return res.json({ err: "compile memory doesn't exist" });

			// checking if there is an existing record
			if (compiledMemory.records.find((item: any) => item.record == record_id))
				return res.status(400).json({ error: "record already exist in compiled memory" });

			// Append the message to record's compiled-memory section
			CompiledMemory.findOneAndUpdate({ _id: compiled_memory_id }, { $push: { records: { record: record_id } } })
				.then((item: ICompiledMemory) => res.json({ msg: "Added record successfully", item }))
				.catch((err: Errback) => res.json({ err }));
		})
		.catch((err: Errback) => res.json({ err }));
});

// @route	DELETE /api/compiled-memory
// @desc	Remove record to compiled-memory
// @access	Public
router.delete("/", (req, res) => {
	const { record_id, compiled_memory_id } = req.body;
	console.log("Remove record to compiled-memory", req.body);

	// Checking for missing field
	if (!record_id || !compiled_memory_id) return res.status(400).json({ error: "Missing field" });
	CompiledMemory.findById(compiled_memory_id)
		.then((compiledMemory: any) => {
			// checking if there is an existing compiled-memory
			if (!compiledMemory) return res.json({ err: "compile memory doesn't exist" });

			// checking if there is an existing record
			if (!compiledMemory.records.find((item: any) => item.record == record_id))
				return res.status(400).json({ error: "record doesn't exist in compiled memory" });

			// remove the instance of the record from compiled-memory
			CompiledMemory.findOneAndUpdate(
				{ _id: compiled_memory_id },
				{ $pull: { records: { record: record_id } } },
				{ safe: true, multi: true }
			)
				.then(() => res.json({ msg: "Deleted successfully" }))
				.catch((err: Errback) => res.json(err));
		})
		.catch((err: Errback) => res.json({ err }));
});

module.exports = router;
