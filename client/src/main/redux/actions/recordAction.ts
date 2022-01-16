import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../reducers/allReducer";

import { RecordActionType } from "./allActionTypes";
import { RecordActionSchema, IRecords, INewRecord } from "../actionSchemas/recordSchema";

const itemFetch = (allItem: IRecords): RecordActionSchema => {
	return {
		type: RecordActionType.RECORD_FETCH,
		payload: { allItem },
	};
};

const itemCreate = (newItemArray: IRecords): RecordActionSchema => {
	return {
		type: RecordActionType.RECORD_CREATE,
		payload: { newItemArray },
	};
};

const itemUpdate = (newItemArray: IRecords): RecordActionSchema => {
	return {
		type: RecordActionType.RECORD_UPDATE,
		payload: { newItemArray },
	};
};

const itemDelete = (newItemArray: IRecords): RecordActionSchema => {
	return {
		type: RecordActionType.RECORD_DELETE,
		payload: { newItemArray },
	};
};

export const fetchItem = () => {
	return (dispatch: Dispatch<RecordActionSchema>) => {
		axios
			.get("/api/records/")
			.then(res => dispatch(itemFetch(res.data)))
			.catch(err => console.log(err));
	};
};

export const createItem = (newItem: INewRecord) => {
	return (dispatch: Dispatch<RecordActionSchema>, getState: () => RootState) => {
		const records = getState().record;

		axios
			.post("/api/records/", newItem)
			.then(res => {
				const newRecordArray = [...records, res.data];
				dispatch(itemCreate(newRecordArray));
			})
			.catch(err => console.log(err));
	};
};

export const updateItem = (updatedItem: { _id: string; updItem: INewRecord }) => {
	return (dispatch: Dispatch<RecordActionSchema>, getState: () => RootState) => {
		const records = getState().record;

		axios
			.put("/api/records/", updatedItem)
			.then(res => {
				console.log(res);
				console.log("successss");
				const index = records.findIndex(element => element._id === updatedItem._id);
				records[index].image = updatedItem.updItem.image;
				records[index].title = updatedItem.updItem.title;
				records[index].date = updatedItem.updItem.date;
				records[index].owner = updatedItem.updItem.owner;
				records[index].description = updatedItem.updItem.description;
				records[index].tag = updatedItem.updItem.tag;
				records[index].address = updatedItem.updItem.address;
				records[index].coordinate = updatedItem.updItem.coordinate;
				const newItemArray = [...records];
				dispatch(itemUpdate(newItemArray));
			})
			.catch(err => console.log("err", err));
	};
};

export const deleteItem = (removeItem: { _id: string }) => {
	return (dispatch: Dispatch<RecordActionSchema>, getState: () => RootState) => {
		const records = getState().record;

		console.log("oki", removeItem._id);
		axios
			.delete(`/api/records/${removeItem._id}`)
			.then(res => {
				console.log(res);
				console.log("successss");
				const newItemArray = records.filter(item => item._id !== removeItem._id);
				dispatch(itemDelete(newItemArray));
			})
			.catch(err => console.log("err", err));
	};
};
