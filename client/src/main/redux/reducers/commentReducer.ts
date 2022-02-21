import { CommentActionType } from "../actions/allActionTypes";
import { ICommentState, CommentActionSchema } from "../actionSchemas/commentSchema";

const initialState: ICommentState = {
	_id: "",
	record_id: "",
	comments: [],
	isLoading: false,
	isTokenValid: false,
	errorMsg: "",
};

const commentReducer = (state: ICommentState = initialState, action: CommentActionSchema): ICommentState => {
	switch (action.type) {
		case CommentActionType.COMMENT_FETCH:
			return {
				...action.payload.commentSection,
				isTokenValid: state.isTokenValid,
				isLoading: false,
				errorMsg: "",
			};

		case CommentActionType.COMMENT_LOADING:
			return {
				...state,
				isLoading: true,
			};

		case CommentActionType.COMMENT_ERROR:
			return {
				_id: "",
				record_id: "",
				comments: [],
				isLoading: false,
				isTokenValid: false,

				errorMsg: action.payload.errorMsg,
			};

		case CommentActionType.COMMENT_CLEAR_ERROR:
			return {
				...state,
				errorMsg: "",
			};

		case CommentActionType.COMMENT_CREATE:
			return {
				...state,
				comments: [...state.comments, action.payload.commentDetails],
			};

		case CommentActionType.COMMENT_RESET:
			return {
				_id: "",
				record_id: "",
				comments: [],
				isLoading: false,
				isTokenValid: false,
				errorMsg: "",
			};

		default:
			return state;
	}
};

export default commentReducer;
