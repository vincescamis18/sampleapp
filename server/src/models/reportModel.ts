const mongoose = require("mongoose");

export interface IReport {
	_id: string;
	type: string[];
	description: string;
	status: string;
	reporter: string;
	record_id: string;
}

const reportSchema: IReport = new mongoose.Schema(
	{
		type: [{ type: String }],
		description: { type: String },
		status: { type: String },
		reporter: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
		record_id: { type: mongoose.Schema.Types.ObjectId, ref: "records" },
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
	}
);

export const Report = mongoose.model("reports", reportSchema);
