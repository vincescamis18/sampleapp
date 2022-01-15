// @ts-nocheck
const users = []; // [{ userID, username, roomName }]

// Creating and adding the user in user's array
const addUser_videoCon = ({ userID, username, roomName }) => {
	users.push({ userID, username, roomName });
	// console.log("addUser_videoCon:", users)
};

// Getting the information of the user using its id
const getUser_videoCon = userID => {
	// console.log("getUser_videoCon:", users.find(user => user.userID === userID))
	return users.find(user => user.userID === userID);
};

// Removing the user in user's array using its userID
const removeUser_videoCon = userID => {
	const user = users.find(user => user.userID === userID); // checking if user exist
	const index = users.indexOf(user); // getting the index of the user
	users.splice(index, 1); /// remove the user in user's array
	// console.log("removeUser_videoCon:", users)
};

const getTotalUsersInRoom_videoCon = roomName => {
	// console.log("getUsersInRoom_chat:", users.filter(user => user.roomName === roomName).length)
	return users.filter(user => user.roomName === roomName).length;
};
// Getting all the user inside the room
const getUsersInRoom_videoCon = roomName => {
	// console.log("getUsersInRoom_chat:", users.filter(user => user.roomName === roomName).length)
	return users.filter(user => user.roomName === roomName);
};

module.exports = {
	addUser_videoCon,
	getUser_videoCon,
	removeUser_videoCon,
	getUsersInRoom_videoCon,
	getTotalUsersInRoom_videoCon,
};
