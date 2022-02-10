import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../reducers/allReducer";

import { UserActionType } from "./allActionTypes";
import { UserActionSchema, INewUser, IUser } from "../actionSchemas/userSchema";

export const userFetch = (allItem: IUser): UserActionSchema => {
	return {
		type: UserActionType.USER_FETCH,
		payload: { allItem },
	};
};

const userUpdate = (newItemArray: INewUser): UserActionSchema => {
	return {
		type: UserActionType.USER_UPDATE,
		payload: { newItemArray },
	};
};

export const fetchUser = () => {
	return (dispatch: Dispatch<UserActionSchema>) => {
		const token = localStorage.getItem("auth-token");
		if (token) {
			axios
				.get("/api/userz/data", { headers: { "x-auth-token": token } })
				.then(res => {
					// console.log("res.data", res.data); // Debug
					console.log("res.data FETCH USER", res.data.user);
					dispatch(userFetch(res.data.user));
				})
				.catch(err => console.log("err", err));
		}
	};
};

export const updateUser = (updItem: INewUser) => {
	return (dispatch: Dispatch<UserActionSchema>, getState: () => RootState) => {
		const user = getState().user;

		const updatedItem: { _id: string; updItem: INewUser } = {
			_id: user._id,
			updItem: {
				...updItem,
				email: user.email,
			},
		};

		axios
			.put("/api/userz/", updatedItem)
			.then(res => {
				console.log(res);
				console.log("successss");
				dispatch(userUpdate(updatedItem.updItem));
			})
			.catch(err => console.log("err", err));
	};
};
