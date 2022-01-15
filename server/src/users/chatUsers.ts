interface IUsers {
	userID: string;
	username: string;
	roomName: string;
}

const users: IUsers[] = []; // [{ userID, username, room }]

// Creating and adding the user in user's array
const addUser_chat = ({ userID, username, roomName }: IUsers): void => {
	users.push({ userID, username, roomName });
	// console.log("addUser_chat:", users)
};

// Getting the information of the user using its userID
const getUser_chat = (userID: string) => {
	// console.log("getUser_chat:", users.find(user => user.userID === userID))
	return users.find(user => user.userID === userID);
};

// Removing the user in user's array using its userID
const removeUser_chat = (userID: string): void => {
	const user: any = users.find(user => user.userID === userID); // checking if user exist
	const index = users.indexOf(user); // getting the index of the user
	users.splice(index, 1); /// remove the user in user's array
	// console.log("removeUser_chat:", users)
};

// Getting all the user inside the room
const getUsersInRoom_chat = (roomName: string): IUsers[] => {
	// console.log("getUsersInRoom_chat:", users.filter(user => user.roomName === roomName).length)
	return users.filter((user: IUsers) => user.roomName === roomName);
};

export { addUser_chat, getUser_chat, removeUser_chat, getUsersInRoom_chat };
