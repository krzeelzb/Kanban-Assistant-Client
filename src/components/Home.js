import React, {useEffect, useState} from 'react';
import Column from "./Column"
import {Container, Grid} from 'semantic-ui-react'
import {DragDropContext, Droppable} from "react-beautiful-dnd"
import {sort} from "../actions/columnsActions"
import axios from "../axios";
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';

import Styles from "./elements/styles";

import assistantLogo from '../assistantLogo.png'

function Home() {
    const classes = useStyles();

    const onDragEnd = (result) => {
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

    const useFetch = () => {
        const [columns, setColumns] = useState(null);
        const [loading, setLoading] = useState(true);
        useEffect(() => {
            async function fetchData() {
                const response = await axios.get(`/columns/all/`, {'headers': {'Authorization': sessionStorage.getItem("jwtToken")}});
                const item = response.data.columns;
                setColumns(item);
                setLoading(false);
            }

            fetchData()
        }, []);
        return [columns, loading];
    };

    const [columns, loading] = useFetch();
    if (loading) {
        return <div>loading....</div>;
    }
    return (
        <React.Fragment>
            <CssBaseline/>
            <AppBar position="relative">
                <Toolbar>
                    <DeveloperBoardIcon className={classes.icon}/>
                    <Typography variant="h6" color="inherit" noWrap>
                        Kanban Assistant
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Kanban Assistant
                            <img src={assistantLogo} alt="Logo"/>
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Manage your Kanban Board with your Voice using Google Assistant.
                        </Typography>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <div className="Home" style={styles.app}>
                                <Droppable droppableId="all-lists" direction="horizontal" type="list">
                                    {provided => (
                                        <div style={styles.listContainer} {...provided.droppableProps}
                                             ref={provided.innerRef}>
                                            {columns.map((list, index) => (
                                                <Column listId={list.columnId} key={list.columnId} title={list.title}
                                                        cards={list.cardIds}
                                                        index={index}
                                                />
                                            ))}
                                            {/*<ActionButton list/>*/}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        </DragDropContext>
                    </Grid>
                </Container>
            </main>

            <footer className={classes.footer}>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Project for Bachelor Thesis
                </Typography>
                <Copyright/>
            </footer>
        </React.Fragment>
    );
}

const styles = {
    listContainer: {
        background: "#sfe3e6",
        display: "flex",
        flexDirection: "row",

    },
    app: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"

    }
};

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Elżbieta Krzeczek
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = Styles;

export default (Home);
