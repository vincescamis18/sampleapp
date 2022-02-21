import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../reducers/allReducer";

import { CommentActionType } from "./allActionTypes";
import { CommentActionSchema, ICommentDetails, IComment } from "../actionSchemas/commentSchema";

const commentLoading = (): CommentActionSchema => {
	return {
		type: CommentActionType.COMMENT_LOADING,
		payload: {},
	};
};

const commentError = (errorMsg: string): CommentActionSchema => {
	return {
		type: CommentActionType.COMMENT_ERROR,
		payload: { errorMsg },
	};
};

const commentClearError = (): CommentActionSchema => {
	return {
		type: CommentActionType.COMMENT_CLEAR_ERROR,
		payload: {},
	};
};

const commentFetch = (commentSection: IComment): CommentActionSchema => {
	return {
		type: CommentActionType.COMMENT_FETCH,
		payload: { commentSection },
	};
};

const commentCreate = (commentDetails: ICommentDetails): CommentActionSchema => {
	return {
		type: CommentActionType.COMMENT_CREATE,
		payload: { commentDetails },
	};
};

export const commentReset = (): CommentActionSchema => {
	return {
		type: CommentActionType.COMMENT_RESET,
		payload: {},
	};
};

export const fetchComment = (recordId: string) => {
	return (dispatch: Dispatch<CommentActionSchema>) => {
		dispatch(commentLoading());

		axios
			.get(`/api/comment/${recordId}`)
			.then(res => {
				const { _id, record_id, comments } = res.data[0];
				// console.log("res.data", res.data[0]); // Debug
				dispatch(commentFetch({ _id, record_id, comments }));
			})
			.catch(err => {
				// console.log("err", err); // Debug
				if (err.message.includes("401")) localStorage.setItem("auth-token", "");
				dispatch(commentError(err.message));
			});
	};
};

export const createComment = (record_id: string, message: string) => {
	return (dispatch: Dispatch<CommentActionSchema>, getState: () => RootState) => {
		const user = getState().user;

		dispatch(commentLoading());

		const updatedItem = { record_id, user_id: user._id, message };
		const config = { headers: { "Content-Type": "application/json" } };

		axios
			.patch("/api/comment/", updatedItem, config)
			.then(() => {
				// console.log("res.data", user._id, user.surname, user.given_name, user.user_profile); // Debug
				const commentDetails = {
					_id: new Date().toISOString(),
					user_id: {
						_id: user._id,
						surname: user.surname,
						given_name: user.given_name,
						user_profile: user.user_profile,
					},
					message,
					date: new Date().toISOString(),
				};
				dispatch(commentCreate(commentDetails));
			})
			.catch(err => {
				// console.log("err", err); // Debug
				if (err.message.includes("401")) localStorage.setItem("auth-token", "");
				dispatch(commentError(err.message));
			});
	};
};
