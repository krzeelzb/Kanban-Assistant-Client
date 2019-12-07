import React, {Component} from "react"
import Icon from "@material-ui/core/Icon";
import TextareaAutosize from 'react-textarea-autosize';
import Card from '@material-ui/core/Card';
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import { addColumn, CONSTANTS} from "../actions/types"
import axios from "../axios";

class ActionButton extends Component {
    state = {
        formOpen: false,
        text: ""
    };
    openForm = () => {
        this.setState({
            formOpen: true
        })
    };
    closeForm = e => {
        this.setState({
            formOpen: false
        })
    };
    handleInputChange = e => {
        this.setState({
            text: e.target.value
        })
    };

    handleAddList = () => {
        const {dispatch} = this.props;
        const {text} = this.state;
        if (text) {
            this.setState({
                text: ""
            });
            dispatch(addColumn(text))
        }
        return;
    };

    //TODO: reload after adding a card
    //TODO: refactor to use hooks
    handleAddCard = () => {
        const { listId} = this.props;
        const {text} = this.state;
        console.log((text));
        if (text) {
            (this.addCard(listId, text));
            this.setState({
                text: ""
            });
            this.forceUpdate();
        }
        return;
    };

    addCard = async (listId, text) => {
            await axios
                .post('/cards/', {
                    "title":text,
                    "columnId":listId,
                    "cardId":text
                },{'headers':{'Authorization':sessionStorage.getItem("jwtToken")}})
                .then((res) => {
                })
                .catch(err => {
                    console.log(err);
                });
    };

    renderAddButton = () => {
        const {list} = this.props;
        const buttonText = list ? "Add another list" : "Add another card";
        const buttonTextOpacity = list ? 1 : 0.5;
        const buttonTextColor = list ? "white" : "inherit";
        const buttonTextBackground = list ? "rgb(0,0,0,.15)" : "inherit";

        return (
            <div
                onClick={this.openForm}
                style={{
                    ...styles.button,
                    opacity: buttonTextOpacity,
                    color: buttonTextColor,
                    backgroundColor: buttonTextBackground
                }}>
                <Icon>add</Icon>
                <p>{buttonText}</p>

            </div>
        )
    };

    renderForm = () => {
        const {list} = this.props;
        const placeholder = list ? "Enter list title..." : "Enter a title for this card...";
        const buttonTitle = list ? "Add List" : "Add Card";
        return (
            <div>
                <Card style={{
                    overflow: "visible",
                    minHeight: 80,
                    minWidth: 272,
                    padding: "6px 8px 2px"

                }}>
                    <TextareaAutosize

                        placeholder={placeholder}
                        autoFocus
                        onBlur={this.closeForm}
                        value={this.state.text}
                        onChange={this.handleInputChange}
                        style={{
                            resize: "none",
                            width: "100%",
                            outline: "none",
                            border: "none"
                        }}
                    />

                </Card>
                <div style={styles.fromButtonGroup}>
                    <Button
                        onMouseDown={list ? this.handleAddList : this.handleAddCard}
                        variant="contained"
                        style={{color: "white", backgroundColor: "#5aac44"}}>
                        {buttonTitle}
                    </Button>
                    <Icon style={{marginLeft: 8, cursor: "pointer"}}>close</Icon>
                </div>
            </div>
        )
    };
    render() {
        return this.state.formOpen ? this.renderForm() : this.renderAddButton()
    }
}

const styles = {
    button: {
        display: "flex",
        borderRadius: 3,
        alignItems: "center",
        cursor: "pointer",
        height: 36,
        width: 272,
        paddingleft: 10,
    },
    fromButtonGroup: {
        marginTop: 10,
        display: "flex",
        alignItems: "center"
    }
};

export default connect()(ActionButton);
