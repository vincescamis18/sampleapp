import { UserAccessActionType } from "../actions/allActionTypes";
import { IUserAccessState, UserAccessActionSchema } from "../actionSchemas/userAccessSchema";

const initialState: IUserAccessState = {
	_id: "",
	user_access: "",
	user_id: "",
	isLoading: false,
	isTokenValid: false,
	errorMsg: "",
};

const userAccessReducer = (state: IUserAccessState = initialState, action: UserAccessActionSchema): IUserAccessState => {
	switch (action.type) {
		case UserAccessActionType.USER_ACCESS_FETCH:
			return {
				...action.payload.userDetails,
				isTokenValid: state.isTokenValid,
				isLoading: false,
				errorMsg: "",
			};

		case UserAccessActionType.USER_ACCESS_LOADING:
			return {
				...state,
				isLoading: true,
			};

		case UserAccessActionType.USER_ACCESS_ERROR:
			return {
				_id: "",
				user_access: "",
				user_id: "",
				isLoading: false,
				isTokenValid: false,
				errorMsg: action.payload.errorMsg,
			};

		case UserAccessActionType.USER_ACCESS_CLEAR_ERROR:
			return {
				...state,
				errorMsg: "",
			};

		default:
			return state;
	}
};

export default userAccessReducer;
