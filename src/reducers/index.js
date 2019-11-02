import {combineReducers} from "redux"
import columnReducer from "./columnReducer"

export default combineReducers({
    lists: columnReducer
});
