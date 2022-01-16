import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import zampleReducer from "./zampleReducer";
import recordReducer from "./recordReducer";

const reducers = combineReducers({
	item: itemReducer,
	zample: zampleReducer,
	record: recordReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
