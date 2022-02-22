const mongoose = require("mongoose");

export interface IRecord {
	images: { link: string }[];
	title: string;
	date: string;
	owner: string;
	description: string;
	tag: string;
	address: string;
	coordinate_x: number;
	coordinate_y: number;
	creator: string;
}

const recordSchema: IRecord = new mongoose.Schema(
	{
		images: [{ link: String }],
		title: { type: String },
		date: { type: Date },
		owner: { type: String },
		description: { type: String },
		tag: { type: String },
		address: { type: String },
		coordinate_x: { type: Number },
		coordinate_y: { type: Number },
		creator: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
	}
);

export const Record = mongoose.model("records", recordSchema);
