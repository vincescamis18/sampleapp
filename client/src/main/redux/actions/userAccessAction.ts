import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../reducers/allReducer";

import { UserAccessActionType } from "./allActionTypes";
import { UserAccessActionSchema, IUserAccess } from "../actionSchemas/userAccessSchema";

const userAccessLoading = (): UserAccessActionSchema => {
	return {
		type: UserAccessActionType.USER_ACCESS_LOADING,
		payload: {},
	};
};

const userAccessError = (errorMsg: string): UserAccessActionSchema => {
	return {
		type: UserAccessActionType.USER_ACCESS_ERROR,
		payload: { errorMsg },
	};
};

const userAccessClearError = (): UserAccessActionSchema => {
	return {
		type: UserAccessActionType.USER_ACCESS_CLEAR_ERROR,
		payload: {},
	};
};

const userAccessFetch = (userDetails: IUserAccess): UserAccessActionSchema => {
	return {
		type: UserAccessActionType.USER_ACCESS_FETCH,
		payload: { userDetails },
	};
};

export const fetchUserAccess = () => {
	return (dispatch: Dispatch<UserAccessActionSchema>) => {
		dispatch(userAccessLoading());
		const token = localStorage.getItem("auth-token");
		if (token) {
			// fetching the user using token
			axios
				.get("/api/user-access/token/", { headers: { "x-auth-token": token } })
				.then(res => {
					if (res.data.length > 0) {
						const { _id, user_access, user_id } = res.data[0];
						console.log("res", res.data[0]);
						dispatch(userAccessFetch({ _id, user_access, user_id }));
					} else dispatch(userAccessFetch({ _id: "", user_access: "", user_id: "" }));
				})
				.catch(err => {
					console.log("err", err); // Debug
					if (err.message.includes("401")) localStorage.setItem("auth-token", "");
					dispatch(userAccessError(err.message));
				});
		}
	};
};
