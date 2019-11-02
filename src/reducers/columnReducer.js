import {CONSTANTS} from "../actions";

const initialState = [
    {
        title: "TO DO",
        id: "list0",
        cards: [
            {
                id: 0,
                text: "do unit testing"
            },
            {
                id: 1,
                text: "peer testing"
            }
        ]
    },
    {
        title: "DOING",
        id: "list1",
        cards: [
            {
                id: 2,
                text: "do unit testing"
            },
            {
                id: 3,
                text: "peer testing"
            }
        ]
    },
    {
        title: "DONE",
        id: "list3",
        cards: [
            {
                id: 5,
                text: "do unit testing"
            },
            {
                id: 6,
                text: "peer testing"
            }
        ]
    }
];
let listID = 5;
let cardID = 7;
const columnReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload,
                cards: [],
                id: listID

            };
            listID += 1;
            return [...state, newList];
        case CONSTANTS.ADD_CARD: {
            const newCard = {
                text: action.payload.text,
                id: cardID
            };
            cardID += 1;
            const newState = state.map(list => {
                if (list.id === action.payload.listId) {
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    }
                } else {
                    return list;
                }
            });
            return newState;
        }
        case CONSTANTS.DRAG_HAPPENED:
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexEnd,
                droppableIndexStart,
                type
            } = action.payload;
            const newState = [...state];

            if (type === "list") {
                const list = newState.splice(droppableIndexStart, 1);
                newState.splice(droppableIndexEnd, 0, ...list)
                return newState;
            }

            if (droppableIdStart === droppableIdEnd) {
                const list = state.find(list => droppableIdStart === list.id);
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd, 0, ...card)
            }

            if (droppableIdStart !== droppableIdEnd) {
                //list where drag happened
                const listStart = state.find(list => droppableIdStart === list.id);
                //pull out the card from the list
                const card = listStart.cards.splice(droppableIndexStart, 1);
                //find the list where the drag ended
                const listEnd = state.find(list => droppableIdEnd === list.id);
                //put the card in the new line
                listEnd.cards.splice(droppableIndexEnd, 0, ...card)
            }
            return newState;
        default:
            return state;
    }
};
export default columnReducer;
