import express, { Request, Response, Errback } from "express";
import { Report, IReport } from "../../models/reportModel";
const auth = require("../../middlewares/authentication");

const router = express.Router();

// @route   GET /api/report/
// @desc    Retrieve all report
// @access  Public
router.get("/", (req: Request, res: Response) => {
	Report.find()
		.sort({ date: 1 })
		.then((item: IReport) => res.json(item));
});

// @route   GET /api/report/:id
// @desc    Retrieve report by id
// @access  Public
router.get("/:_id", (req: Request, res: Response) => {
	Report.findById(req.params._id)
		.then((item: IReport) => res.json(item))
		.catch((err: Errback) => res.json(err));
});

// @route   POST /api/report/
// @desc    Create new report
// @access  Public
router.post("/", (req, res) => {
	console.log(req.body);
	const newItem = new Report(req.body);
	newItem.save().then((item: Errback) => res.json(item));
});

// @route   PUT /api/report/
// @desc    Update report by _id
// @access  Public
router.put("/", (req: Request, res: Response) => {
	const { updItem, _id } = req.body;
	Report.updateOne({ _id }, { $set: updItem })
		.then((updItem: any) => res.json(updItem))
		.catch((err: any) => res.json({ err }));
});

// @route   DELETE /api/report/
// @desc    Delete report by _id
// @access  Public
router.delete("/:_id", (req: Request, res: Response) => {
	Report.deleteOne({ _id: req.params._id })
		.then(() => res.json({ msg: "Deleted successfully" }))
		.catch((err: any) => res.json({ err }));
});

module.exports = router;
