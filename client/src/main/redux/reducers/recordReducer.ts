import { RecordActionType } from "../actions/allActionTypes";
import { IRecordState, RecordActionSchema } from "../actionSchemas/recordSchema";

const initialState: IRecordState = {
	records: [],
	isLoading: false,
	errorMsg: "",
	isTokenValid: true,
};

const recordReducer = (state: IRecordState = initialState, action: RecordActionSchema): IRecordState => {
	switch (action.type) {
		case RecordActionType.RECORD_FETCH:
			return { records: action.payload.allItem, isLoading: false, errorMsg: "", isTokenValid: state.isTokenValid };

		case RecordActionType.RECORD_CREATE:
			return { records: action.payload.newItemArray, isLoading: false, errorMsg: "", isTokenValid: state.isTokenValid };

		case RecordActionType.RECORD_UPDATE:
			return { records: action.payload.newItemArray, isLoading: false, errorMsg: "", isTokenValid: state.isTokenValid };

		case RecordActionType.RECORD_DELETE:
			return { records: action.payload.newItemArray, isLoading: false, errorMsg: "", isTokenValid: state.isTokenValid };

		default:
			return state;
	}
};

export default recordReducer;
