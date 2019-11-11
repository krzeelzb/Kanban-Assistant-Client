import {CONSTANTS} from "./types"
import axios from '../axios'

export const addCard = (listId, text) => {
    return async (dispatch) => {
        await axios
            .post('/cards/', {
                "title":text,
                "columnId":listId,
                "cardId":text
            })
            .then((res) => {
                console.log(res)
                console.log(res.data.card)
                dispatch({type: CONSTANTS.ADD_CARD, payload: res.data.card});
            }).bind(this)
            .catch(err => {
                console.log(err);
            });
    };
};
