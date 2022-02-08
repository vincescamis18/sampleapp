import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import zampleReducer from "./zampleReducer";
import recordReducer from "./recordReducer";
import manageUserReducer from "./manageUserReducer";

const reducers = combineReducers({
	item: itemReducer,
	zample: zampleReducer,
	record: recordReducer,
	manageUser: manageUserReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
