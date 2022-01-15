const mongoose = require("mongoose");

export interface IItem {
	name: string;
	price: string;
	date: string;
}

const itemSchema = new mongoose.Schema({
	name: { type: String },
	price: { type: Number },
	date: { type: Date, default: Date.now },
});

export const Item = mongoose.model("items", itemSchema);
