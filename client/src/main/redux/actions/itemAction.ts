import { Dispatch } from "redux";
import { RootState } from "../reducers/allReducer";

import { ItemActionType } from "./allActionTypes";
import { ItemActionSchema } from "../actionSchemas/itemSchema";

export const itemChangeString = (string101: string): ItemActionSchema => {
	return {
		type: ItemActionType.ITEM_CHANGE_STRING,
		payload: { string101 },
	};
};

export const itemChangeNumber = (number101: number): ItemActionSchema => {
	return {
		type: ItemActionType.ITEM_CHANGE_NUMBER,
		payload: { number101 },
	};
};

export const itemChangeBoolean = (boolean101: boolean): ItemActionSchema => {
	return {
		type: ItemActionType.ITEM_CHANGE_BOOLEAN,
		payload: { boolean101 },
	};
};

export const itemCreateElement = (newItem: string): ItemActionSchema => {
	return {
		type: ItemActionType.ITEM_CREATE_ELEMENTT,
		payload: { newItem },
	};
};

const itemUpdateElement = (newItemArray: { element: string }[]): ItemActionSchema => {
	return {
		type: ItemActionType.ITEM_UPDATE_ELEMENTT,
		payload: { newItemArray },
	};
};

const itemDeleteElement = (newItemArray: { element: string }[]): ItemActionSchema => {
	return {
		type: ItemActionType.ITEM_DELETE_ELEMENTT,
		payload: { newItemArray },
	};
};

export const updateElement = (updateItem: string, updatedItem: string) => {
	return (dispatch: Dispatch<ItemActionSchema>, getState: () => RootState) => {
		const array101 = getState().item.array101;
		const item = array101.find(item => item.element === updateItem);
		if (item) {
			const index = array101.indexOf(item);
			array101[index].element = updatedItem;
			const newItemArray = [...array101];
			dispatch(itemUpdateElement(newItemArray));
		}
	};
};

export const deleteElement = (removeItem: string) => {
	return (dispatch: Dispatch<ItemActionSchema>, getState: () => RootState) => {
		const array101 = getState().item.array101;
		const newItemArray = array101.filter(item => item.element !== removeItem);
		dispatch(itemDeleteElement(newItemArray));
	};
};
