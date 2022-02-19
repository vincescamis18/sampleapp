const mongoose = require("mongoose");

export interface IComment {
	_id: string;
	record_id: string;
	comments: [
		{
			user_id: string;
			message: string;
			date: string;
		}
	];
}

const CommentSchema: IComment = new mongoose.Schema(
	{
		record_id: { type: mongoose.Schema.Types.ObjectId, ref: "records" },
		comments: [
			{
				user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
				message: { type: String, require: true },
				date: { type: Date, default: Date.now },
			},
		],
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
	}
);

export const Comment = mongoose.model("comments", CommentSchema);
