import { RecordActionType } from "../actions/allActionTypes";
import { IRecords, RecordActionSchema } from "../actionSchemas/recordSchema";

const initialState: IRecords = [];

const zampleReducer = (state: IRecords = initialState, action: RecordActionSchema): IRecords => {
	switch (action.type) {
		case RecordActionType.RECORD_FETCH:
			return action.payload.allItem;

		case RecordActionType.RECORD_CREATE:
			return action.payload.newItemArray;

		case RecordActionType.RECORD_UPDATE:
			return action.payload.newItemArray;

		case RecordActionType.RECORD_DELETE:
			return action.payload.newItemArray;

		default:
			return state;
	}
};

export default zampleReducer;
