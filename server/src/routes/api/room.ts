// @ts-nocheck
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../../middlewares/authentication");

const Room = require("../../models/roomModel");

// Create Room with roomName and password
// @route				POST /room/create
// @desc				creating a room
// @access				public
// @parameters			{ roomName, password }
// @res.data			{ _id, roomName, messages } || { err }
// @possible errors		{ err: "Missing field" } || { err: "Room already exist" }
router.post("/create", (req, res) => {
	// Checking for missing field
	const { roomName, password, date } = req.body;
	if (!roomName || !password || !date) return res.status(400).json({ err: "Missing field" });

	// Checking for a existing roomName
	Room.findOne({ roomName }).then(room => {
		if (room) return res.status(400).json({ err: "Room already exist" });

		// Generating salt and hashing the password
		bcrypt.genSalt(10, (err, salt) => {
			if (err) throw err;
			bcrypt.hash(password, salt, (err, hash) => {
				if (err) throw err;

				// Creating room with roomName
				const newRoom = new Room({
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
				newRoom
					.save()
					.then(room =>
						res.status(200).json({
							_id: room._id,
							roomName: room.roomName,
							messages: room.messages,
						})
					)
					.catch(err => res.json(err));
			});
		});
	});
});

// Joining room with roomName and password
// @route				POST /room/join
// @desc				joining a room room
// @access				public
// @parameters			{ roomName, password }
// @res.data			{ _id, roomName, messages } || { err }
// @possible errors		{ err: "Missing field" } || { err: "Room doesn't exist" } || { err: "Invalid password" }
router.post("/join", (req, res) => {
	// Checking for missing field
	const { roomName, password } = req.body;
	if (!roomName || !password) return res.status(400).json({ err: "Missing field" });

	// Checking for a existing roomName
	Room.findOne({ roomName }).then(room => {
		if (!room) return res.status(400).json({ err: "Room doesn't exist" });

		// Validating password
		bcrypt.compare(password, room.password).then(isMatch => {
			if (!isMatch) return res.status(400).json({ err: "Invalid password" });

			return res.status(200).json({
				_id: room._id,
				roomName: room.roomName,
				messages: room.messages,
			});
		});
	});
});

// Saving messages from the room
// @route	POST /room/msg
// @desc	Append messages
// @access	Public
router.patch("/message", auth, (req, res) => {
	// Checking for missing field
	const { _id, username, message, date } = req.body;
	if (!_id || !username || !message) return res.json({ err: "Missing field" });

	Room.findByIdAndUpdate({ _id }, { $push: { messages: { username, message, date } } })
		.then(room => res.json(room))
		.catch(err => res.json({ err }));
});

module.exports = router;
