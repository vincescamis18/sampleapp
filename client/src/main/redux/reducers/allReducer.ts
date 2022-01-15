import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import zampleReducer from "./zampleReducer";

const reducers = combineReducers({
	item: itemReducer,
	zample: zampleReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
