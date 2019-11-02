import React, {Component} from 'react';
import Column from "./Column"
import {connect} from "react-redux"
import ActionButton from "./ActionButton"
import {DragDropContext, Droppable} from "react-beautiful-dnd"
import {sort} from "../actions"

class App extends Component {

    onDragEnd = (result) => {
        const {destination, source, draggableId, type} = result;

        if (!destination) {
            return;
        }
        this.props.dispatch(
            sort(
                source.droppableId,
                destination.droppableId,
                source.index,
                destination.index,
                draggableId,
                type
            )
        );
    };

    render() {
        const {lists} = this.props;
        return (
            <div><h3>KANBAN ASSISTANT</h3>
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="App">
                    <Droppable droppableId="all-lists" direction="horizontal" type="list">
                        {provided => (
                            <div style={styles.listContainer} {...provided.droppableProps} ref={provided.innerRef}>
                                {lists.map((list, index) => (
                                    <Column listId={list.id} key={list.id} title={list.title} cards={list.cards}
                                            index={index}
                                    />
                                ))}
                                <ActionButton list/>
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
            </div>
        );
    }
}

const styles = {
    listContainer: {
        background: "#sfe3e6",
        display: "flex",
        flexDirection: "row",
    }
};
const mapStateToProps = state => ({
    lists: state.lists

});

export default connect(mapStateToProps)(App);
