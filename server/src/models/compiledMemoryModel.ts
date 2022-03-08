const mongoose = require("mongoose");

export interface ICompiledMemory {
	title: string;
	description: string;
	images: { link: string }[];
	record_id: { record: string }[];
	creator: string;
}

const compiledMemorySchema: ICompiledMemory = new mongoose.Schema(
	{
		title: { type: String },
		description: { type: String },
		images: [{ link: String }],
		records: [{ record: { type: mongoose.Schema.Types.ObjectId, ref: "records" } }],
		creator: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
	}
);

export const CompiledMemory = mongoose.model("compiled_memories", compiledMemorySchema);
