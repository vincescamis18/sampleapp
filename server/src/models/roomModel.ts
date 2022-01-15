const mongoose = require("mongoose");

export interface IRoom {
	roomName: string;
	password: string;
	messages: {
		username: string;
		message: string;
		date: string;
	}[];
}

const roomSchema = new mongoose.Schema({
	roomName: { type: String, required: true },
	password: { type: String, required: true },
	messages: [
		{
			username: { type: String, require: true },
			message: { type: String, require: true },
			date: { type: Date },
		},
	],
});

const Room = mongoose.model("room", roomSchema);

module.exports = Room;
