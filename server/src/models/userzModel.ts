const mongoose = require("mongoose");

export interface IUsers {
	_id: string;
	surname: string;
	given_name: string;
	user_profile: string;
	province: string;
	city: string;
	barangay: string;
	email: string;
	contact_number: string;
}

const usersSchema: IUsers = new mongoose.Schema({
	surname: { type: String },
	given_name: { type: String },
	user_profile: { type: String },
	province: { type: String },
	city: { type: String },
	barangay: { type: String },
	email: { type: String },
	contact_number: { type: String },
});

export const Users = mongoose.model("users", usersSchema);
