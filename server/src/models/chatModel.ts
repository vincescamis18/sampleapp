const mongoose = require("mongoose");

export interface IChat {
	roomName: string;
	password: string;
	messages: {
		username: string;
		message: string;
		date: string;
	}[];
}

const chatSchema = new mongoose.Schema({
	// roomName: { type: String, required: true },
	// password: { type: String, required: true },
	messages: [
		{
			username: { type: String, require: true },
			message: { type: String, require: true },
			date: { type: Date },
		},
	],
});

const Chat = mongoose.model("chat", chatSchema);

module.exports = Chat;
