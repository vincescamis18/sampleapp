import { ManageUserActionType } from "../actions/allActionTypes";

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
	type: ManageUserActionType.MANAGE_USER_FETCH;
	payload: { allItem: IUsers };
}

interface IUserCreateAction {
	type: ManageUserActionType.MANAGE_USER_CREATE;
	payload: { newItemArray: IUsers };
}

interface IUserUpdateAction {
	type: ManageUserActionType.MANAGE_USER_UPDATE;
	payload: { newItemArray: IUsers };
}

interface IUserDeleteAction {
	type: ManageUserActionType.MANAGE_USER_DELETE;
	payload: { newItemArray: IUsers };
}

export type UserActionSchema = IUserFetchAction | IUserCreateAction | IUserUpdateAction | IUserDeleteAction;
