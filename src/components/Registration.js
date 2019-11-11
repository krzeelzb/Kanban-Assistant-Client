import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {COMMON_FIELDS, REGISTRATION_FIELDS} from './MessageBundle';
import axios from "../axios";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
export default class Registration extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            register: false,
            error: false
        };
    }

    handleOnChangeName = e => {
        this.setState({
            name: e.target.value
        });
    }
    handleOnChangeEmail = e => {
        this.setState({
            email: e.target.value
        });
    }
    handleOnChangePassword = e => {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit = e => {

        e.preventDefault();

        this.register(this.state.name, this.state.email, this.state.password)

    }

    register = async (name, email, password) => {

        await axios.post('/users',
            {
                "name": name,
                "email": email,
                "password": password
            }).then(res => {

            console.log(res)

        }).catch(err => {
            console.log(err);
            this.state.setState({
                error:true
            })
        });
    }

    classes = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

}));


    render() {

        return (

            <Container component="main" maxWidth="xs" >
                <CssBaseline />
                <div className={this.classes.paper}>
                    {/*<Avatar className={this.classes.avatar}>*/}
                        {/*<LockOutlinedIcon />*/}
                    {/*</Avatar>*/}
                    <Typography component="h2" variant="h5">
                        <LockOutlinedIcon />
                        Sign up
                    </Typography>
                </div>

                <div className="Registration">
                <form className={this.classes.form} onSubmit={this.onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                autoComplete="fname"
                                name="ame"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Name"
                                autoFocus
                                value={this.state.name}
                                onChange={this.handleOnChangeName}
                            />                        </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={this.state.email}
                            onChange={this.handleOnChangeEmail}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={this.handleOnChangePassword}
                        />
                    </Grid>

                        <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={this.classes.submit}
                        >
                            Sign Up
                        </Button>

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                    </Grid>

                    </Grid>

                </form>
            </div>
            </Container>

        )
    }
}
