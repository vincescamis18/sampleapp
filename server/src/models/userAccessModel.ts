const mongoose = require("mongoose");

export interface IUserAccess {
	_id: string;
	user_access: string;
	user_id: string;
}

const userAccessSchema: IUserAccess = new mongoose.Schema(
	{
		user_access: { type: String },
		user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
	}
);

export const UserAccess = mongoose.model("user_access", userAccessSchema);
