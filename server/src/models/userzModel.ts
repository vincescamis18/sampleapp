const mongoose = require("mongoose");

export interface IUsers {
	_id: string;
	surname: string;
	given_name: string;
	user_profile: string;
	email: string;
	location: string;
	Bio: string;
	birthday: Date;
}

const usersSchema: IUsers = new mongoose.Schema(
	{
		surname: { type: String },
		given_name: { type: String },
		user_profile: { type: String },
		email: { type: String },
		location: { type: String },
		bio: { type: String },
		birthday: { type: Date },
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
	}
);

export const Users = mongoose.model("users", usersSchema);
