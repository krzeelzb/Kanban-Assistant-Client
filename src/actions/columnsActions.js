import {CONSTANTS} from "./types"
import axios from '../axios';
export const addColumn = (title) => {
    return {
        type: CONSTANTS.ADD_LIST,
        payload: title
    }
};

export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type
) => {
    return {
        type: CONSTANTS.DRAG_HAPPENED,
        payload: {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexEnd,
            droppableIndexStart,
            draggableId,
            type
        }
    }
};

export const getAllColumns = () => {
    return async (dispatch,getState) => {
        const res = await axios.get(`/columns/all/`);

        const { columns } = res.data;
        dispatch({
            type: CONSTANTS.SET_COLUMNS,
            payload: {
                columns,
            },
        });
    };
};

export const getAllCards = columnIds => {
    return (dispatch,getState) => {
        if (columnIds.length === 0) {
            return dispatch({
                type: CONSTANTS.SET_CARDS,
                payload: {
                    cards: [],
                },
            });
        }
        axios
            .post('/cards/getAllCards', { columnIds })
            .then((res) => {
                // console.log(req)
                console.log(res.data.cards)
                dispatch({ type: CONSTANTS.SET_CARDS, payload: res.data.cards });
                console.log("state2")
                console.log(getState())
            })
            .catch(err => {
                console.log(err);
            });
    };
};
