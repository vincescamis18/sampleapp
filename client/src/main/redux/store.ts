import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducers from "./reducers/allReducer";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(rootReducers, {}, composeWithDevTools(applyMiddleware(thunk)));
