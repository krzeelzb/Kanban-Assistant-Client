import {CONSTANTS} from "../actions/types";

const initialState = {
    cards: null,
};

const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.SET_CARDS: {
            const cards = action.payload;
            // const newCards = flatten(cards).reduce((accum, currentValue) => {
            //     accum[currentValue.cardId] = {
            //         id: currentValue.cardId,
            //         content: currentValue.title,
            //     };
            //     return accum;
            // }, {});
            console.log("llllllllllllllllllll")
            console.log(cards)
            return { cards: cards };
        }
        default:
            return state;
    }
};
export default cardReducer;
