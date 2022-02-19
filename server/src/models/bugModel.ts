const mongoose = require("mongoose");

export interface IBug {
	_id: string;
	type: string;
	title: string;
	description101: string;
	date: string;
}

const bugSchema: IBug = new mongoose.Schema(
	{
		type: { type: String },
		title: { type: String },
		description101: { type: String },
		reporter: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
	}
);

export const Bug = mongoose.model("bugs", bugSchema);
