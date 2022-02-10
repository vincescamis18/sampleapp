import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../reducers/allReducer";

import { UserActionType } from "./allActionTypes";
import { UserActionSchema, INewUser, IUser } from "../actionSchemas/userSchema";

const userLoading = (): UserActionSchema => {
	return {
		type: UserActionType.USER_LOADING,
		payload: {},
	};
};

const userError = (errorMsg: string): UserActionSchema => {
	return {
		type: UserActionType.USER_ERROR,
		payload: { errorMsg },
	};
};

const userClearError = (): UserActionSchema => {
	return {
		type: UserActionType.USER_CLEAR_ERROR,
		payload: {},
	};
};

const userFetch = (allItem: IUser): UserActionSchema => {
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

export const retrieveLoginCredential = () => {
	return (dispatch: Dispatch<UserActionSchema>) => {
		axios
			.get("/auth/login/success", {
				withCredentials: true,
				headers: { Accept: "application/json", "Content-Type": "application/json" },
			})
			.then(res => {
				console.log("user login success", res.data); // Debug
				localStorage.setItem("auth-token", res.data.token);
				dispatch(userFetch(res.data.user));
			})
			.catch(err => {
				console.log("err", err); // Debug
				dispatch(userError(err));
			});
	};
};

export const fetchUser = () => {
	return (dispatch: Dispatch<UserActionSchema>) => {
		dispatch(userLoading());
		const token = localStorage.getItem("auth-token");
		if (token) {
			axios
				.get("/api/userz/data", { headers: { "x-auth-token": token } })
				.then(res => {
					// console.log("res.data.user", res.data.user); // Debug
					dispatch(userFetch(res.data.user));
				})
				.catch(err => {
					// console.log("err", err); // Debug
					if (err.message.includes("401")) localStorage.setItem("auth-token", "");
					dispatch(userError(err.message));
				});
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
				// console.log(res, "updated successfully"); // Debug
				dispatch(userUpdate(updatedItem.updItem));
			})
			.catch(err => console.log("err", err));
	};
};
