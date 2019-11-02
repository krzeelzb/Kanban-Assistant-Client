import React,{Component} from "react"
import SingleCard from "./SingleCard"
import ActionButton from "./ActionButton"
import {Draggable, Droppable} from "react-beautiful-dnd"
import {getAllCards, getAllColumns} from "../actions/types"

import {connect} from "react-redux"
class Column extends Component {


// const Column = ({title, cards, listId, index}) => {

    // getCards=(columnId)=>{
    //     return this.props.getcolumnId)
    // }

    render() {
        console.log(this.props)
        const id = this.props.listId
        return (


            <Draggable draggableId={String(this.props.listId)} index={this.props.index}>
                {provided => (
                    <div {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                        <Droppable droppableId={String(this.props.listId)}>
                            {(provided) => (
                                <div  {...provided.droppableProps} ref={provided.innerRef} style={styles.container}>
                                    <h4>{this.props.title}</h4>
                                    {/*{this.props.getCards(id)}*/}


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
        );
    }
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


const mapStateToProps = state => {
    return {
        list: state.lists,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCards:(id)=> {
            dispatch(getAllCards(id));
        }
    };
};
export default connect(mapStateToProps,{mapDispatchToProps})(Column);
