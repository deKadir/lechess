import { createStore, combineReducers } from "redux";
import boardReducer from "./reducers/boardReducer";
import animationReducer from "./reducers/animationReducer";
const reducers = combineReducers({
  pieces: boardReducer,
  animations: animationReducer,
});
const store = createStore(reducers);
export default store;
