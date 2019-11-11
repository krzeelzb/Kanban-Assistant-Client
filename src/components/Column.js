import React, {Component, useFetch} from "react"
import SingleCard from "./SingleCard"
import ActionButton from "./ActionButton"
import {Draggable, Droppable} from "react-beautiful-dnd"
import {getAllCards} from "../actions/types"
import {connect} from "react-redux"

class Column extends Component {
    render() {
        return (
            <div>
                <Draggable draggableId={String(this.props.columnId)} index={this.props.index}>
                    {provided => (
                        <div {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                            <Droppable droppableId={String(this.props.columnId)}>
                                {(provided) => (
                                    <div  {...provided.droppableProps} ref={provided.innerRef} style={styles.container}>
                                        <h4>{this.props.title}</h4>
                                        {

                                            this.props.cards.map((card, index) => (
                                                console.log("singlecdrs"),
                                                    console.log(card),
                                                    <SingleCard
                                                        id={card}
                                                        index={index}
                                                        key={card}
                                                        text={card}/>
                                            ))
                                        }
                                        {provided.placeholder}
                                        <ActionButton listId={this.props.listId}/>
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    )}
                </Draggable>

            </div>
        );
    }
}

const styles = {
    container: {
        backgroundColor: "#ccc",
        borderRadius: 5,
        width: 325,
        heigth: "100%",
        padding: 10,
        marginRight: 25
    }
};

export default (Column);
