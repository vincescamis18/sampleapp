const mongoose = require("mongoose");

export interface IUserz {
	username: string;
	email: string;
	password: string;
}

const userzSchema: IUserz = new mongoose.Schema({
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	middle_name: { type: String, required: true },
	user_profile: { type: String, required: true },
	province: { type: String, required: true },
	city: { type: String, required: true },
	barangay: { type: String, required: true },
	email: { type: String, required: true },
	contact_number: { type: String, required: true },
	firebase_id: { type: String, required: true },
});

export const Userz = mongoose.model("users", userzSchema);
