import { createStore, combineReducers } from "redux";
import boardReducer from "./reducers/boardReducer";
const reducers = combineReducers({
  pieces: boardReducer,
});
const store = createStore(reducers);
export default store;
