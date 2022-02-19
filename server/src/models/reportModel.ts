const mongoose = require("mongoose");

export interface IReport {
	_id: string;
	type: string;
	title: string;
	description: string;
}

const reportSchema: IReport = new mongoose.Schema(
	{
		type: { type: String },
		title: { type: String },
		description: { type: String },
		reporter: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
	}
);

export const Report = mongoose.model("reports", reportSchema);
