import express, { Request, Response, Errback } from "express";
import { FeaturedMemory, IFeaturedMemory } from "../../models/featuredMemoryModel";
import { Users } from "../../models/userzModel";

const router = express.Router();

// @route   GET /api/featured-memory/
// @desc    Retrieve all featured-memory
// @access  Public
router.get("/", (req: Request, res: Response) => {
	console.log("Retrieve all featured-memory");

	FeaturedMemory.find()
		.sort({ date: 1 })
		.then((item: IFeaturedMemory) => res.json(item));
});

// @route   GET /api/featured-memory/
// @desc    Retrieve all featured-memory with record details
// @access  Public
router.get("/details-record/", (req: Request, res: Response) => {
	console.log("Retrieve all featured-memory with record details");

	FeaturedMemory.find()
		.populate("record_id")
		.sort({ date: 1 })
		.then((item: IFeaturedMemory) => res.json(item));
});

// @route   GET /api/featured-memory/
// @desc    Retrieve all featured-memory with record and user details
// @access  Public
router.get("/details-record-user/", (req: Request, res: Response) => {
	console.log("Retrieve all featured-memory with record and user details");

	FeaturedMemory.find()
		.populate("record_id")
		.sort({ date: 1 })
		.then((featuredMemory: any) => {
			if (featuredMemory.length > 0) {
				let count = 0;
				for (let a = 0; a < featuredMemory.length; a++) {
					Users.findById(featuredMemory[a].record_id.creator)
						.select("_id surname given_name user_profile")
						.then((user: any) => {
							count++;
							featuredMemory[a].record_id.creator = user;
							if (count == featuredMemory.length) res.json(featuredMemory);
						});
				}
			}
		});
});

// @route   GET /api/featured-memory-today/
// @desc    Retrieve the featured memory of the day
// @access  Public
router.get("/featured-memory-today/", (req: Request, res: Response) => {
	console.log("Retrieve the featured memory of the day");

	const currentDate = new Date();
	FeaturedMemory.find({ date_start: { $lte: currentDate }, date_end: { $gt: currentDate } })
		.populate("record_id")
		.then((featuredMemory: any) => {
			if (featuredMemory.length > 0) {
				Users.findById(featuredMemory[0].record_id.creator)
					.select("_id surname given_name user_profile")
					.then((user: any) => {
						featuredMemory[0].record_id.creator = user;
						res.json(featuredMemory);
					});
			} else res.json({ msg: "No set up" });
		});
});

// @route   GET /api/featured-memory/:id
// @desc    Retrieve featured-memory by id
// @access  Public
router.get("/:_id", (req: Request, res: Response) => {
	console.log("Retrieve featured-memory by id", req.params._id);

	FeaturedMemory.findById(req.params._id)
		.then((item: IFeaturedMemory) => res.json(item))
		.catch((err: Errback) => res.json(err));
});

// @route   GET /api/featured-memory/:id
// @desc    Retrieve featured-memory by id with record details
// @access  Public
router.get("/details-record/:_id", (req: Request, res: Response) => {
	console.log("Retrieve featured-memory by id with record details", req.params._id);

	FeaturedMemory.findById(req.params._id)
		.populate("record_id")
		.then((item: IFeaturedMemory) => res.json(item))
		.catch((err: Errback) => res.json(err));
});

// @route   POST /api/featured-memory/
// @desc    Add featured-memory
// @access  Public
router.post("/", (req, res) => {
	const newItem = new FeaturedMemory(req.body);
	console.log("Add featured-memory", req.body);

	newItem
		.save()
		.then((item: IFeaturedMemory) => res.json(item))
		.catch((item: Errback) => res.json(item));
});

// @route   PUT /api/featured-memory/
// @desc    Update featured-memory by _id
// @access  Public
router.put("/", (req: Request, res: Response) => {
	const { updItem, _id } = req.body;
	console.log("Update featured-memory by _id", req.body);

	FeaturedMemory.updateOne({ _id }, { $set: updItem })
		.then(() => res.json({ msg: "Updated successfully", updItem }))
		.catch((err: Errback) => res.json({ err }));
});

// @route   DELETE /api/featured-memory/
// @desc    Delete featured-memory by _id
// @access  Public
router.delete("/:_id", (req: Request, res: Response) => {
	console.log("Delete featured-memory by _id", req.params);

	FeaturedMemory.deleteOne({ _id: req.params._id })
		.then(() => res.json({ msg: "Deleted successfully" }))
		.catch((err: Errback) => res.json({ err }));
});

module.exports = router;
