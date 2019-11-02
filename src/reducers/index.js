import {combineReducers} from "redux"
import columnReducer from "./columnReducer"
import cardReducer from "./cardReducer";

export default combineReducers({
    lists: columnReducer,
    cards:cardReducer
});
