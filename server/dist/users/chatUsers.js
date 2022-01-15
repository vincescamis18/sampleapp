"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersInRoom_chat = exports.removeUser_chat = exports.getUser_chat = exports.addUser_chat = void 0;
const users = []; // [{ userID, username, room }]
// Creating and adding the user in user's array
const addUser_chat = ({ userID, username, roomName }) => {
    users.push({ userID, username, roomName });
    // console.log("addUser_chat:", users)
};
exports.addUser_chat = addUser_chat;
// Getting the information of the user using its userID
const getUser_chat = (userID) => {
    // console.log("getUser_chat:", users.find(user => user.userID === userID))
    return users.find(user => user.userID === userID);
};
exports.getUser_chat = getUser_chat;
// Removing the user in user's array using its userID
const removeUser_chat = (userID) => {
    const user = users.find(user => user.userID === userID); // checking if user exist
    const index = users.indexOf(user); // getting the index of the user
    users.splice(index, 1); /// remove the user in user's array
    // console.log("removeUser_chat:", users)
};
exports.removeUser_chat = removeUser_chat;
// Getting all the user inside the room
const getUsersInRoom_chat = (roomName) => {
    // console.log("getUsersInRoom_chat:", users.filter(user => user.roomName === roomName).length)
    return users.filter((user) => user.roomName === roomName);
};
exports.getUsersInRoom_chat = getUsersInRoom_chat;
