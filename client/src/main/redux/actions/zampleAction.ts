import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../reducers/allReducer";

import { ItemzActionType } from "./allActionTypes";
import { ItemActionSchema, IItem } from "../actionSchemas/zampleSchema";

const itemFetch = (allItem: IItem): ItemActionSchema => {
	return {
		type: ItemzActionType.ITEM_FETCH,
		payload: { allItem },
	};
};

const itemCreate = (newItemArray: IItem): ItemActionSchema => {
	return {
		type: ItemzActionType.ITEM_CREATE,
		payload: { newItemArray },
	};
};

const itemUpdate = (newItemArray: IItem): ItemActionSchema => {
	return {
		type: ItemzActionType.ITEM_UPDATE,
		payload: { newItemArray },
	};
};

const itemDelete = (newItemArray: IItem): ItemActionSchema => {
	return {
		type: ItemzActionType.ITEM_DELETE,
		payload: { newItemArray },
	};
};

export const fetchItem = () => {
	return (dispatch: Dispatch<ItemActionSchema>) => {
		axios
			.get("/api/items/")
			.then(res => dispatch(itemFetch(res.data)))
			.catch(err => console.log(err));
	};
};

export const createItem = (newItem: { name: string; price: number }) => {
	return (dispatch: Dispatch<ItemActionSchema>, getState: () => RootState) => {
		const items = getState().zample;

		axios
			.post("/api/items/", newItem)
			.then(res => {
				const newItemArray = [...items, res.data];
				dispatch(itemCreate(newItemArray));
			})
			.catch(err => console.log(err));
	};
};

export const updateItem = (updatedItem: { _id: string; updItem: { name: string; price: number } }) => {
	return (dispatch: Dispatch<ItemActionSchema>, getState: () => RootState) => {
		const items = getState().zample;

		axios
			.put("/api/items/", updatedItem)
			.then(res => {
				console.log(res);
				console.log("successss");
				const index = items.findIndex(element => element._id === updatedItem._id);
				items[index].name = updatedItem.updItem.name;
				items[index].price = updatedItem.updItem.price;
				const newItemArray = [...items];
				dispatch(itemUpdate(newItemArray));
			})
			.catch(err => console.log("err", err));
	};
};

export const deleteItem = (removeItem: { _id: string }) => {
	return (dispatch: Dispatch<ItemActionSchema>, getState: () => RootState) => {
		const items = getState().zample;

		console.log("oki", removeItem._id);
		axios
			.delete(`/api/items/${removeItem._id}`)
			.then(res => {
				console.log(res);
				console.log("successss");
				const newItemArray = items.filter(item => item._id !== removeItem._id);
				dispatch(itemDelete(newItemArray));
			})
			.catch(err => console.log("err", err));
	};
};
