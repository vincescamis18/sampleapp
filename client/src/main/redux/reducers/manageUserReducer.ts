import { UserActionType } from "../actions/allActionTypes";
import { IUsers, UserActionSchema } from "../actionSchemas/manageUserSchema";

const initialState: IUsers = [];

const zampleReducer = (state: IUsers = initialState, action: UserActionSchema): IUsers => {
	switch (action.type) {
		case UserActionType.USER_FETCH:
			return action.payload.allItem;

		case UserActionType.USER_CREATE:
			return action.payload.newItemArray;

		case UserActionType.USER_UPDATE:
			return action.payload.newItemArray;

		case UserActionType.USER_DELETE:
			return action.payload.newItemArray;

		default:
			return state;
	}
};

export default zampleReducer;
