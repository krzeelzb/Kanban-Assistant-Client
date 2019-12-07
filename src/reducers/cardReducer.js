import {CONSTANTS} from "../actions/types";

const initialState = {
    cards: null,
};

const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.SET_CARDS: {
            const cards = action.payload;
            return {cards: cards};
        }
        default:
            return state;
    }
};
export default cardReducer;
