import { UserActionType } from "../actions/allActionTypes";

export interface INewUser {
	surname: string;
	given_name: string;
	user_profile: string;
	province: string;
	city: string;
	barangay: string;
	email: string;
	contact_number: string;
}

export type IUser = {
	_id: string;
	surname: string;
	given_name: string;
	user_profile: string;
	province: string;
	city: string;
	barangay: string;
	email: string;
	contact_number: string;
};

export type IUsers = IUser[];

interface IUserFetchAction {
	type: UserActionType.USER_FETCH;
	payload: { allItem: IUsers };
}

interface IUserCreateAction {
	type: UserActionType.USER_CREATE;
	payload: { newItemArray: IUsers };
}

interface IUserUpdateAction {
	type: UserActionType.USER_UPDATE;
	payload: { newItemArray: IUsers };
}

interface IUserDeleteAction {
	type: UserActionType.USER_DELETE;
	payload: { newItemArray: IUsers };
}

export type UserActionSchema = IUserFetchAction | IUserCreateAction | IUserUpdateAction | IUserDeleteAction;
