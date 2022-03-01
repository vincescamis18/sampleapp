const mongoose = require("mongoose");

export interface IBug {
	_id: string;
	title: string;
	description: string;
	reporter: string;
	status: string;
}

const bugSchema: IBug = new mongoose.Schema(
	{
		title: { type: String },
		description: { type: String },
		reporter: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
		status: { type: String },
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
	}
);

export const Bug = mongoose.model("bugs", bugSchema);
