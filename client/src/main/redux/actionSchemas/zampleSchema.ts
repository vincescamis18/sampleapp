import { ItemzActionType } from "../actions/allActionTypes";

export type IItem = {
	_id: string;
	name: string;
	price: number;
}[];

interface IItemFetchAction {
	type: ItemzActionType.ITEM_FETCH;
	payload: { allItem: IItem };
}

interface IItemCreateAction {
	type: ItemzActionType.ITEM_CREATE;
	payload: { newItemArray: IItem };
}

interface IItemUpdateAction {
	type: ItemzActionType.ITEM_UPDATE;
	payload: { newItemArray: IItem };
}

interface IItemDeleteAction {
	type: ItemzActionType.ITEM_DELETE;
	payload: { newItemArray: IItem };
}

export type ItemActionSchema = IItemFetchAction | IItemCreateAction | IItemUpdateAction | IItemDeleteAction;
