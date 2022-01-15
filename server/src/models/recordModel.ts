const mongoose = require("mongoose");

export interface IRecord {
	image: string;
	title: string;
	date: string;
	owner: string;
	description: string;
	tag: string;
	address: string;
	coordinate: string;
}

const recordSchema = new mongoose.Schema({
	image: { type: String },
	title: { type: String },
	date: { type: Date },
	owner: { type: String },
	description: { type: String },
	tag: { type: String },
	address: { type: String },
	coordinate: { type: String },
});

export const Record = mongoose.model("records", recordSchema);
