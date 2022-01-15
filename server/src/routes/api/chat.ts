// @ts-nocheck
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../../middlewares/authentication");

const Chat = require("../../models/chatModel");

// Create Chat with roomName and password
// @route				POST /chat/create
// @desc				creating a chat room
// @access				public
// @parameters			{ roomName, password }
// @res.data			{ _id, roomName, messages } || { err }
// @possible errors		{ err: "Missing field" } || { err: "Chat already exist" }
router.post("/create", (req, res) => {
	// Checking for missing field
	const { roomName, password, date } = req.body;
	if (!roomName || !password || !date) return res.status(400).json({ err: "Missing field" });

	// Checking for a existing roomName
	Chat.findOne({ roomName }).then(chat => {
		if (chat) return res.status(400).json({ err: "Chat already exist" });

		// Generating salt and hashing the password
		bcrypt.genSalt(10, (err, salt) => {
			if (err) throw err;
			bcrypt.hash(password, salt, (err, hash) => {
				if (err) throw err;

				// Creating chat with roomName
				const newChat = new Chat({
					roomName,
					password: hash,
					messages: [
						{
							username: "Banbot",
							message: `${roomName} has been created!`,
							date,
						},
					],
				});
				newChat
					.save()
					.then(chat =>
						res.status(200).json({
							_id: chat._id,
							roomName: chat.roomName,
							messages: chat.messages,
						})
					)
					.catch(err => res.json(err));
			});
		});
	});
});

// Joining chat with roomName and password
// @route				POST /chat/join
// @desc				joining a chat room
// @access				public
// @parameters			{ roomName, password }
// @res.data			{ _id, roomName, messages } || { err }
// @possible errors		{ err: "Missing field" } || { err: "Chat doesn't exist" } || { err: "Invalid password" }
router.post("/join", (req, res) => {
	// Checking for missing field
	const { roomName, password } = req.body;
	if (!roomName || !password) return res.status(400).json({ err: "Missing field" });

	// Checking for a existing roomName
	Chat.findOne({ roomName }).then(chat => {
		if (!chat) return res.status(400).json({ err: "Chat doesn't exist" });

		// Validating password
		bcrypt.compare(password, chat.password).then(isMatch => {
			if (!isMatch) return res.status(400).json({ err: "Invalid password" });

			return res.status(200).json({
				_id: chat._id,
				roomName: chat.roomName,
				messages: chat.messages,
			});
		});
	});
});

// Saving messages from the chat
// @route	POST /chat/msg
// @desc	Append messages
// @access	Public
router.patch("/", auth, (req, res) => {
	// Checking for missing field
	const { _id, username, message, date } = req.body;
	if (!_id || !username || !message) return res.json({ err: "Missing field" });

	Chat.findByIdAndUpdate({ _id }, { $push: { messages: { username, message, date } } })
		.then(chat => res.json(chat))
		.catch(err => res.json({ err }));
});

module.exports = router;
