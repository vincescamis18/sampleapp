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

// Record with creator details
export type IRecordWithCreator = {
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
	creator: {
		_id: string;
		given_name: string;
		surname: string;
		user_profile: string;
	};
};

// Reducer record structure
export type IRecordState = { records: IRecord[]; isLoading: boolean; errorMsg: string; isTokenValid: boolean };

interface IRecordFetchAction {
	type: RecordActionType.RECORD_FETCH;
	payload: { allItem: IRecord[] };
}

interface IRecordCreateAction {
	type: RecordActionType.RECORD_CREATE;
	payload: { newItemArray: IRecord[] };
}

interface IRecordUpdateAction {
	type: RecordActionType.RECORD_UPDATE;
	payload: { newItemArray: IRecord[] };
}

interface IRecordDeleteAction {
	type: RecordActionType.RECORD_DELETE;
	payload: { newItemArray: IRecord[] };
}

interface IRecordLoadingAction {
	type: RecordActionType.RECORD_LOADING;
	payload: {};
}

interface IRecordErrorAction {
	type: RecordActionType.RECORD_ERROR;
	payload: { errorMsg: string };
}

interface IRecordClearErrorAction {
	type: RecordActionType.RECORD_CLEAR_ERROR;
	payload: {};
}

export type RecordActionSchema =
	| IRecordFetchAction
	| IRecordCreateAction
	| IRecordUpdateAction
	| IRecordDeleteAction
	| IRecordLoadingAction
	| IRecordErrorAction
	| IRecordClearErrorAction;
