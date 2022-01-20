import { RecordActionType } from "../actions/allActionTypes";

export interface INewRecord {
	image: string;
	title: string;
	date: string;
	owner: string;
	description: string;
	tag: string;
	address: string;
	coordinate_x: number;
	coordinate_y: number;
	creator: string;
}

export type IRecord = {
	_id: string;
	image: string;
	title: string;
	date: string;
	owner: string;
	description: string;
	tag: string;
	address: string;
	coordinate_x: number;
	coordinate_y: number;
	creator: string;
};

export type IRecords = IRecord[];

interface IRecordFetchAction {
	type: RecordActionType.RECORD_FETCH;
	payload: { allItem: IRecords };
}

interface IRecordCreateAction {
	type: RecordActionType.RECORD_CREATE;
	payload: { newItemArray: IRecords };
}

interface IRecordUpdateAction {
	type: RecordActionType.RECORD_UPDATE;
	payload: { newItemArray: IRecords };
}

interface IRecordDeleteAction {
	type: RecordActionType.RECORD_DELETE;
	payload: { newItemArray: IRecords };
}

export type RecordActionSchema = IRecordFetchAction | IRecordCreateAction | IRecordUpdateAction | IRecordDeleteAction;
