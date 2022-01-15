import { ItemActionType } from "../actions/allActionTypes";

export interface IItemInitialState {
	string101: string;
	number101: number;
	boolean101: boolean;
	array101: { element: string }[];
}

interface IChangeStringAction {
	type: ItemActionType.ITEM_CHANGE_STRING;
	payload: { string101: string };
}

interface IChangeNumberAction {
	type: ItemActionType.ITEM_CHANGE_NUMBER;
	payload: { number101: number };
}

interface IChangeBooleanAction {
	type: ItemActionType.ITEM_CHANGE_BOOLEAN;
	payload: { boolean101: boolean };
}

interface ICreateElementAction {
	type: ItemActionType.ITEM_CREATE_ELEMENTT;
	payload: { newItem: string };
}

interface IUpdateElementAction {
	type: ItemActionType.ITEM_UPDATE_ELEMENTT;
	payload: { newItemArray: { element: string }[] };
}

interface IDeleteElementAction {
	type: ItemActionType.ITEM_DELETE_ELEMENTT;
	payload: { newItemArray: { element: string }[] };
}

export type ItemActionSchema =
	| IChangeStringAction
	| IChangeNumberAction
	| IChangeBooleanAction
	| ICreateElementAction
	| IUpdateElementAction
	| IDeleteElementAction;
