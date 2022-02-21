import { CommentActionType } from "../actions/allActionTypes";

// Comment message
export interface ICommentDetails {
	_id: string;
	user_id: {
		_id: string;
		surname: string;
		given_name: string;
		user_profile: string;
	};
	message: string;
	date: string;
}

// Comment section
export type IComment = {
	_id: string;
	record_id: string;
	comments: {
		_id: string;
		user_id: {
			_id: string;
			surname: string;
			given_name: string;
			user_profile: string;
		};
		message: string;
		date: string;
	}[];
};

// Redux state format
export type ICommentState = {
	_id: string;
	record_id: string;
	comments: {
		_id: string;
		user_id: {
			_id: string;
			surname: string;
			given_name: string;
			user_profile: string;
		};
		message: string;
		date: string;
	}[];
	isLoading: boolean;
	isTokenValid: boolean;
	errorMsg: string;
};

interface ICommentFetchAction {
	type: CommentActionType.COMMENT_FETCH;
	payload: { commentSection: IComment };
}

interface ICommentLoadingAction {
	type: CommentActionType.COMMENT_LOADING;
	payload: {};
}

interface ICommentErrorAction {
	type: CommentActionType.COMMENT_ERROR;
	payload: { errorMsg: string };
}

interface ICommentClearErrorAction {
	type: CommentActionType.COMMENT_CLEAR_ERROR;
	payload: {};
}

interface ICommentCreateAction {
	type: CommentActionType.COMMENT_CREATE;
	payload: { commentDetails: ICommentDetails };
}

interface ICommentResetAction {
	type: CommentActionType.COMMENT_RESET;
	payload: {};
}

export type CommentActionSchema =
	| ICommentFetchAction
	| ICommentLoadingAction
	| ICommentErrorAction
	| ICommentClearErrorAction
	| ICommentCreateAction
	| ICommentResetAction;
