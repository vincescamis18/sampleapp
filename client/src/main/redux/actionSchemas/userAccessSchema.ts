import { UserAccessActionType } from "../actions/allActionTypes";

export type IUserAccess = {
	_id: string;
	user_access: string;
	user_id: string;
};

export type IUserAccessState = {
	_id: string;
	user_access: string;
	user_id: string;
	isLoading: boolean;
	isTokenValid: boolean;
	errorMsg: string;
};

interface IUserAccessFetchAction {
	type: UserAccessActionType.USER_ACCESS_FETCH;
	payload: { userDetails: IUserAccess };
}

interface IUserAccessLoadingAction {
	type: UserAccessActionType.USER_ACCESS_LOADING;
	payload: {};
}

interface IUserAccessErrorAction {
	type: UserAccessActionType.USER_ACCESS_ERROR;
	payload: { errorMsg: string };
}

interface IUserAccessClearErrorAction {
	type: UserAccessActionType.USER_ACCESS_CLEAR_ERROR;
	payload: {};
}

export type UserAccessActionSchema =
	| IUserAccessFetchAction
	| IUserAccessLoadingAction
	| IUserAccessErrorAction
	| IUserAccessClearErrorAction;
