import { ManageUserActionType } from "../actions/allActionTypes";
import { IUsers, UserActionSchema } from "../actionSchemas/manageUserSchema";

const initialState: IUsers = [];

const zampleReducer = (state: IUsers = initialState, action: UserActionSchema): IUsers => {
	switch (action.type) {
		case ManageUserActionType.MANAGE_USER_FETCH:
			return action.payload.allItem;

		case ManageUserActionType.MANAGE_USER_CREATE:
			return action.payload.newItemArray;

		case ManageUserActionType.MANAGE_USER_UPDATE:
			return action.payload.newItemArray;

		case ManageUserActionType.MANAGE_USER_DELETE:
			return action.payload.newItemArray;

		default:
			return state;
	}
};

export default zampleReducer;
