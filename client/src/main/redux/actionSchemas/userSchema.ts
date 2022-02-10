import { UserActionType } from "../actions/allActionTypes";

// Raw input from user
export interface INewUserInput {
	surname: string;
	given_name: string;
	user_profile: FileList | null;
	email: string;
	location: string;
	bio: string;
	birthday: string;
}

export interface INewUser {
	surname: string;
	given_name: string;
	user_profile: string;
	email: string;
	location: string;
	bio: string;
	birthday: string;
}

export type IUser = {
	_id: string;
	surname: string;
	given_name: string;
	user_profile: string;
	email: string;
	location: string;
	bio: string;
	birthday: string;
};

export type IUserState = {
	_id: string;
	surname: string;
	given_name: string;
	user_profile: string;
	email: string;
	isLoading: boolean;
	isTokenValid: boolean;
	errorMsg: string;
	location: string;
	bio: string;
	birthday: string;
};

export type IUsers = IUser[];

interface IUserFetchAction {
	type: UserActionType.USER_FETCH;
	payload: { userDetails: IUser };
}

interface IUserUpdateAction {
	type: UserActionType.USER_UPDATE;
	payload: { updatedUserDetails: INewUser };
}

interface IUserLoadingAction {
	type: UserActionType.USER_LOADING;
	payload: {};
}

interface IUserErrorAction {
	type: UserActionType.USER_ERROR;
	payload: { errorMsg: string };
}

interface IUserClearErrorAction {
	type: UserActionType.USER_CLEAR_ERROR;
	payload: {};
}

export type UserActionSchema =
	| IUserFetchAction
	| IUserUpdateAction
	| IUserLoadingAction
	| IUserErrorAction
	| IUserClearErrorAction;
