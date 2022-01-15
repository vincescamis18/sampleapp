import { ItemzActionType } from "../actions/allActionTypes";
import { IItem, ItemActionSchema } from "../actionSchemas/zampleSchema";

const initialState: IItem = [];

const zampleReducer = (state: IItem = initialState, action: ItemActionSchema): IItem => {
	switch (action.type) {
		case ItemzActionType.ITEM_FETCH:
			return action.payload.allItem;

		case ItemzActionType.ITEM_CREATE:
			return action.payload.newItemArray;

		case ItemzActionType.ITEM_UPDATE:
			return action.payload.newItemArray;

		case ItemzActionType.ITEM_DELETE:
			return action.payload.newItemArray;

		default:
			return state;
	}
};

export default zampleReducer;
