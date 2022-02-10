import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../reducers/allReducer";

import { ManageUserActionType } from "./allActionTypes";
import { UserActionSchema, IUsers, INewUser } from "../actionSchemas/manageUserSchema";

const userFetch = (allItem: IUsers): UserActionSchema => {
	return {
		type: ManageUserActionType.MANAGE_USER_FETCH,
		payload: { allItem },
	};
};

const userCreate = (newItemArray: IUsers): UserActionSchema => {
	return {
		type: ManageUserActionType.MANAGE_USER_CREATE,
		payload: { newItemArray },
	};
};

const userUpdate = (newItemArray: IUsers): UserActionSchema => {
	return {
		type: ManageUserActionType.MANAGE_USER_UPDATE,
		payload: { newItemArray },
	};
};

const userDelete = (newItemArray: IUsers): UserActionSchema => {
	return {
		type: ManageUserActionType.MANAGE_USER_DELETE,
		payload: { newItemArray },
	};
};

export const fetchAllUser = () => {
	return (dispatch: Dispatch<UserActionSchema>) => {
		axios
			.get("/api/userz/")
			.then(res => {
				// console.log("res.data", res.data); // Debug
				dispatch(userFetch(res.data));
			})
			.catch(err => console.log(err));
	};
};

export const createUser = (newItem: INewUser) => {
	console.log("newItem111", newItem);
	return (dispatch: Dispatch<UserActionSchema>, getState: () => RootState) => {
		const users = getState().manageUser;

		axios
			.post("/api/userz/", newItem)
			.then(res => {
				const newRecordArray = [...users, res.data];
				// console.log("newRecordArray", newRecordArray); // Debug
				dispatch(userCreate(newRecordArray));
			})
			.catch(err => console.log(err));
	};
};

export const updateUser = (updatedItem: { _id: string; updItem: INewUser }) => {
	return (dispatch: Dispatch<UserActionSchema>, getState: () => RootState) => {
		const users = getState().manageUser;

		axios
			.put("/api/userz/", updatedItem)
			.then(res => {
				console.log(res);
				console.log("successss");
				const index = users.findIndex(element => element._id === updatedItem._id);
				users[index].surname = updatedItem.updItem.surname;
				users[index].given_name = updatedItem.updItem.given_name;
				users[index].user_profile = updatedItem.updItem.user_profile;
				users[index].province = updatedItem.updItem.province;
				users[index].city = updatedItem.updItem.city;
				users[index].barangay = updatedItem.updItem.barangay;
				users[index].email = updatedItem.updItem.email;
				users[index].contact_number = updatedItem.updItem.contact_number;

				const newItemArray = [...users];
				// console.log("newItemArray", newItemArray); // Debug
				dispatch(userUpdate(newItemArray));
			})
			.catch(err => console.log("err", err));
	};
};

export const deleteUser = (removeItem: { _id: string }) => {
	return (dispatch: Dispatch<UserActionSchema>, getState: () => RootState) => {
		const users = getState().manageUser;

		console.log("oki", removeItem._id);
		axios
			.delete(`/api/userz/${removeItem._id}`)
			.then(res => {
				console.log(res);
				console.log("successss");
				const newItemArray = users.filter(item => item._id !== removeItem._id);
				// console.log("newItemArray", newItemArray); // Debug
				dispatch(userDelete(newItemArray));
			})
			.catch(err => console.log("err", err));
	};
};
