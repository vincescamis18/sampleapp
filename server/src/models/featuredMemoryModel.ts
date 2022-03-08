const mongoose = require("mongoose");

export interface IFeaturedMemory {
	_id: string;
	date_start: string;
	date_end: string;
	record_id: string;
	creator: string;
}

const featuredMemorySchema: IFeaturedMemory = new mongoose.Schema(
	{
		date_start: { type: Date },
		date_end: { type: Date },
		record_id: { type: mongoose.Schema.Types.ObjectId, ref: "records" },
		creator: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
	}
);

export const FeaturedMemory = mongoose.model("featured_memories", featuredMemorySchema);
