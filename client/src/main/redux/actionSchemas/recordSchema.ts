import { RecordActionType } from "../actions/allActionTypes";

// Empty instance for the database generated id
export interface INewRecordEmpty {
	images: {
		link: string;
	}[];
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

// Raw input from user
export interface INewRecordInput {
	images: FileList | null;
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

// Update record API structure
export interface IUpdateRecord {
	_id: string;
	updItem: {
		images: {
			link: string;
			_id: string;
		}[];
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
}

// Raw input from user
export interface IUpdateRecordInput {
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

// Record structure
export type IRecord = {
	_id: string;
	images: { link: string; _id: string }[];
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

// Reducer record structure
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
