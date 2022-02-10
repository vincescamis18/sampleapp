import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../reducers/allReducer";

import { UserActionType } from "./allActionTypes";
import { UserActionSchema, INewUser, IUser, INewUserInput } from "../actionSchemas/userSchema";
import { projectStorage } from "../../utilities/firebaseConfig";

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

const userFetch = (userDetails: IUser): UserActionSchema => {
	return {
		type: UserActionType.USER_FETCH,
		payload: { userDetails },
	};
};

const userUpdate = (updatedUserDetails: INewUser): UserActionSchema => {
	return {
		type: UserActionType.USER_UPDATE,
		payload: { updatedUserDetails },
	};
};

export const retrieveLoginCredential = () => {
	return (dispatch: Dispatch<UserActionSchema>) => {
		// authenticate user using social media and get token
		axios
			.get("/auth/login/success", {
				withCredentials: true,
				headers: { Accept: "application/json", "Content-Type": "application/json" },
			})
			.then(res => {
				// console.log("user login success", res.data); // Debug
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
			// fetching the user using token
			axios
				.get("/api/userz/data", { headers: { "x-auth-token": token } })
				.then(res => {
					// console.log("res.data.user", res.data.user); // Debug
					dispatch(userFetch(res.data.user));
				})
				.catch(err => {
					console.log("err", err); // Debug
					if (err.message.includes("401")) localStorage.setItem("auth-token", "");
					dispatch(userError(err.message));
				});
		}
	};
};

export const updateUser = (updItem: INewUserInput) => {
	return (dispatch: Dispatch<any>) => {
		// console.log("updItem", updItem); // Debug
		dispatch(saveImageToCloud(updItem));
	};
};

const saveImageToCloud = (updItem: INewUserInput) => {
	return (dispatch: Dispatch<any>, getState: () => RootState) => {
		const user = getState().user;

		if (updItem.user_profile) {
			// name the image using the _id from database
			const storageRef = projectStorage.ref(user._id);

			// Store the images in the firebase cloud storage
			storageRef
				.put(updItem.user_profile[0])
				.then(res => {
					if (res.state === "success")
						// Retrive the image link and save to the database
						storageRef
							.getDownloadURL()
							.then((storageURL: string) => {
								// console.log("storageURL", storageURL); // Debug
								dispatch(saveUpdatedProfileToDB(storageURL, updItem));
							})
							.catch(err => {
								console.log("err", err);
								dispatch(userError(err.message));
							});
				})
				.catch(err => {
					console.log("err", err);
					dispatch(userError(err.message));
				});
		}
	};
};

const saveUpdatedProfileToDB = (storageURL: string, updItem: INewUserInput) => {
	return (dispatch: Dispatch<UserActionSchema>, getState: () => RootState) => {
		const user = getState().user;

		// add the updated image link and user datails
		const updatedItem: { _id: string; updItem: INewUser } = {
			_id: user._id,
			updItem: {
				surname: updItem.surname,
				given_name: updItem.given_name,
				user_profile: storageURL,
				email: user.email,
				location: updItem.location,
				bio: updItem.bio,
				birthday: updItem.birthday,
			},
		};

		// update the user profile to database
		axios
			.put("/api/userz/", updatedItem)
			.then(res => {
				dispatch(userUpdate(updatedItem.updItem));
			})
			.catch(err => {
				console.log("err", err);
				dispatch(userError(err.message));
			});
	};
};
