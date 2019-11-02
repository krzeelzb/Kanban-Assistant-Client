import React from "react"
import SingleCard from "./SingleCard"
import ActionButton from "./ActionButton"
import {Draggable, Droppable} from "react-beautiful-dnd"

const Column = ({title, cards, listId, index}) => {
    return (
        <Draggable draggableId={String(listId)} index={index}>
            {provided => (
                <div {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                    <Droppable droppableId={String(listId)}>
                        {(provided) => (
                            <div  {...provided.droppableProps} ref={provided.innerRef} style={styles.container}>
                                <h4>{title}</h4>
                                {
                                    cards.map((card, index) => (
                                        <SingleCard
                                            id={card.id}
                                            index={index}
                                            key={card.id} text={card.text}/>
                                    ))
                                }
                                {provided.placeholder}
                                <ActionButton listId={listId}/>
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
};

const styles = {
    container: {
        backgroundColor: "#ccc",
        borderRadius: 3,
        width: 300,
        heigth: "100%",
        padding: 8,
        marginRight: 8
    }
};
export default Column;
