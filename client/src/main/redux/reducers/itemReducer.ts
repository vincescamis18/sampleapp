import { ItemActionType } from "../actions/allActionTypes";
import { ItemActionSchema, IItemInitialState } from "../actionSchemas/itemSchema";

const initialState: IItemInitialState = {
	string101: "string101",
	number101: 101,
	boolean101: false,
	array101: [{ element: "element01" }, { element: "element02" }, { element: "element03" }],
};

const itemReducer = (state: IItemInitialState = initialState, action: ItemActionSchema): IItemInitialState => {
	switch (action.type) {
		case ItemActionType.ITEM_CHANGE_STRING:
			return { ...state, string101: action.payload.string101 };

		case ItemActionType.ITEM_CHANGE_NUMBER:
			return { ...state, number101: action.payload.number101 };

		case ItemActionType.ITEM_CHANGE_BOOLEAN:
			return { ...state, boolean101: action.payload.boolean101 };

		case ItemActionType.ITEM_CREATE_ELEMENTT:
			return { ...state, array101: [...state.array101, { element: action.payload.newItem }] };

		case ItemActionType.ITEM_UPDATE_ELEMENTT:
			return { ...state, array101: action.payload.newItemArray };

		case ItemActionType.ITEM_DELETE_ELEMENTT:
			return { ...state, array101: action.payload.newItemArray };

		default:
			return state;
	}
};

export default itemReducer;
