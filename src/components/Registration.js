import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import axios from "../axios";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import Error from "./elements/Error";
import Styles from "./elements/styles";

export default class Registration extends Component {

    handleOnChangeName = e => {
        this.setState({
            name: e.target.value
        });
    };
    handleOnChangeEmail = e => {
        this.setState({
            email: e.target.value
        });
    };
    handleOnChangePassword = e => {
        this.setState({
            password: e.target.value
        });
    };
    onSubmit = e => {

        e.preventDefault();

        this.register(this.state.name, this.state.email, this.state.password)

    };
    register = async (name, email, password) => {

        await axios.post('/users',
            {
                "name": name,
                "email": email,
                "password": password
            }).then(res => {

            this.props.history.push("/home");


        }).catch(err => {
            console.log(err);
            this.setState({
                error: true
            })
        });
    };
    classes = Styles;

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: ''
        }
    }

    render() {
        const {error} = this.state;
        return (

            <Container component="main" maxWidth="xs" style={styles.app}>
                <CssBaseline/>
                <div className={this.classes.paper}>
                    <Typography component="h2" variant="h5">
                        <LockOutlinedIcon/>
                        Sign up
                    </Typography>
                    <br/>
                </div>

                <div className="Registration">
                    <form className={this.classes.form} onSubmit={this.onSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
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
                                /> </Grid>
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
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={this.classes.submit}
                                    onClick={this.onSubmit}
                                >
                                    Sign Up
                                </Button>

                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <Link to="/login">
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>

                    </form>
                    {error && <Error message={"Error occured.Please try again."}/>}

                </div>
            </Container>

        )
    }
}
const styles = {
    app: {
        marginTop: "10%"

    }
};

