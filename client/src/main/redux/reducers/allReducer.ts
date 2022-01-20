import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import zampleReducer from "./zampleReducer";
import recordReducer from "./recordReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
	item: itemReducer,
	zample: zampleReducer,
	record: recordReducer,
	user: userReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
