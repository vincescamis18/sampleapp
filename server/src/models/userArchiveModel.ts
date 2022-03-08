const mongoose = require("mongoose");

export interface IUserArchives {
	_id: string;
	user_id: string;
	records: { record: string }[];
}

const userArchiveSchema: IUserArchives = new mongoose.Schema(
	{
		user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
		records: [
			{
				record: { type: mongoose.Schema.Types.ObjectId, ref: "records" },
			},
		],
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
	}
);

export const UserArchives = mongoose.model("user_archives", userArchiveSchema);
