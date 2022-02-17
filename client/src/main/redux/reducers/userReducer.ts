import { UserActionType } from "../actions/allActionTypes";
import { IUserState, UserActionSchema } from "../actionSchemas/userSchema";

const initialState: IUserState = {
	_id: "",
	surname: "",
	given_name: "",
	user_profile: "",
	email: "",
	location: "",
	bio: "",
	birthday: "",
	isLoading: false,
	isTokenValid: false,
	errorMsg: "",
};

const zampleReducer = (state: IUserState = initialState, action: UserActionSchema): IUserState => {
	switch (action.type) {
		case UserActionType.USER_FETCH:
			return {
				...action.payload.userDetails,
				isTokenValid: state.isTokenValid,
				isLoading: false,
				errorMsg: "",
			};

		case UserActionType.USER_UPDATE:
			return {
				...action.payload.updatedUserDetails,
				_id: state._id,
				email: state.email,
				isTokenValid: state.isTokenValid,
				isLoading: false,
				errorMsg: "",
			};

		case UserActionType.USER_LOADING:
			return {
				...state,
				isLoading: true,
			};

		case UserActionType.USER_ERROR:
			return {
				_id: "",
				surname: "",
				given_name: "",
				user_profile: "",
				email: "",
				location: "",
				bio: "",
				birthday: "",
				isLoading: false,
				isTokenValid: false,
				errorMsg: action.payload.errorMsg,
			};

		case UserActionType.USER_CLEAR_ERROR:
			return {
				...state,
				errorMsg: "",
			};

		case UserActionType.USER_LOGOUT:
			return {
				_id: "",
				surname: "",
				given_name: "",
				user_profile: "",
				email: "",
				location: "",
				bio: "",
				birthday: "",
				isLoading: false,
				isTokenValid: false,
				errorMsg: "",
			};

		default:
			return state;
	}
};

export default zampleReducer;
