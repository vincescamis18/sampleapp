// @ts-nocheck
const users = []; // [{ userID, username, roomName }]

// Creating and adding the user in user's array
const addUser_video = ({ userID, username, roomName }) => {
	users.push({ userID, username, roomName });
	// console.log("addUser_video:", users)
};

// Getting the information of the user using its userID
const getUser_video = userID => {
	// console.log("getUser_video:", users.find(user => user.userID === userID))
	return users.find(user => user.userID === userID);
};

// Removing the user in user's array using its userID
const removeUser_video = userID => {
	const user = users.find(user => user.userID === userID); // checking if user exist
	const index = users.indexOf(user); // getting the index of the user
	users.splice(index, 1); /// remove the user in user's array
	// console.log("removeUser_video:", users)
};

const getTotalUsersInRoom_video = roomName => {
	// console.log("getUsersInRoom_chat:", users.filter(user => user.roomName === roomName).length)
	return users.filter(user => user.roomName === roomName).length;
};
// Getting all the user inside the room
const getUsersInRoom_video = roomName => {
	// console.log("getUsersInRoom_chat:", users.filter(user => user.roomName === roomName).length)
	return users.filter(user => user.roomName === roomName);
};

module.exports = { addUser_video, getUser_video, removeUser_video, getUsersInRoom_video, getTotalUsersInRoom_video };
