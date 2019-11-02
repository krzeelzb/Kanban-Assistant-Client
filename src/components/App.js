import React, {Component} from 'react';
import Column from "./Column"
import {connect} from "react-redux"
import ActionButton from "./ActionButton"
import {DragDropContext, Droppable} from "react-beautiful-dnd"
import {sort,getAllColumns} from "../actions/columnsActions"

class App extends Component {
    state = {
        columns:[{
            "cardIds": [
            ],
            "_id":"",
            "title": "",
            "columnId": ""
        }]
    };
    onDragEnd = (result) => {
        const {destination, source, draggableId, type} = result;

        if (!destination) {
            return;
        }

            sort(
                source.droppableId,
                destination.droppableId,
                source.index,
                destination.index,
                draggableId,
                type
            )

    };

    render() {

        const {columns} =  this.props.lists;

        return (
            <div><h3>KANBAN ASSISTANT</h3>
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="App">
                    <Droppable droppableId="all-lists" direction="horizontal" type="list">
                        {provided => (
                            <div style={styles.listContainer} {...provided.droppableProps} ref={provided.innerRef}>
                                {columns.map((list, index) => (
                                    <Column listId={list.columnId} key={list.columnId} title={list.title} cards={list.cardIds}
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
    lists: state.lists,


});

const mapDispatchToProps = dispatch => {
    return {
        getColumns:()=> {
            dispatch(getAllColumns);
        },
        sort:()=>{
            dispatch(sort)
    }
    };
};

// export default connect(null,mapDispatchToProps)(App);
// export default connect(mapStateToProps,{getAllColumns})(App);
// export default connect(null,{getAllColumns})(App);
export default connect(mapStateToProps,mapDispatchToProps)(App);
