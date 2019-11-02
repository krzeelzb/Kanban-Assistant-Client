import {CONSTANTS} from "./types"

export const addCard = (listId, text) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: {text, listId}
    }
};
