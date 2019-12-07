import {applyMiddleware, createStore} from "redux";
import thunk from 'redux-thunk';
import rootReducer from "../reducers"
import {getAllCards, getAllColumns} from "../actions/columnsActions";

const store = createStore(rootReducer, applyMiddleware(thunk));
store.dispatch(getAllCards(["column_done", "column_doing", "column_todo"]));
store.dispatch(getAllColumns());
export default store
