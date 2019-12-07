import React, { Component } from 'react';
import { Link } from "react-router-dom";
import LoginService from '../services/LoginService';
import Message from './elements/Message';
import Error from './elements/Error';
import { COMMON_FIELDS, REGISTRATION_FIELDS, LOGIN_FIELDS, LOGIN_MESSAGE, ERROR_IN_LOGIN } from './MessageBundle';
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
import Container from '@material-ui/core/Container';
export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: false,
            loginSuccess: false
        }
    }

    handleOnChangeEmail = (e) =>  {
        this.setState({
            email: e.target.value
        });
    };

    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    };

    onSubmit = async e => {
        const data = {
            email: this.state.email,
            password: this.state.password
        };
        const loginResult = await LoginService(data);
        console.log(loginResult);
        if(loginResult !== 200) {
            this.setState({
                error: true,
                loginSuccess: false
            });
        }
        else
            this.props.history.push("/home");
            this.setState({
                loginSuccess: true,
                error: false
            });
    };
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
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));
    render() {
        const { loginSuccess, error } = this.state;

        return (
            <Container component="main" maxWidth="xs" style={styles.app}>
                <CssBaseline />
                <div className={this.classes.paper}>
                    {/*<Avatar className={this.classes.avatar}>*/}
                        {/*<LockOutlinedIcon />*/}
                    {/*</Avatar>*/}
                    <Typography component="h1" variant="h5">
                            {/*<LockOutlinedIcon />*/}
                        Sign in
                    </Typography>
                </div>
            <div className="Login">
                <form className={this.classes.form} onSubmit={this.onSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={this.handleOnChangeEmail}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={this.handleOnChangePassword}
                        />
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={this.classes.submit}
                            onClick={this.onSubmit}
                        >
                            Sign In
                        </Button>
                            <Grid item>
                                <Link to="/register">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>

                            {/*<button className={this.classes.submit} type="button" onClick={this.onSubmit} >{ LOGIN_FIELDS.LOGIN }</button>*/}

                </form>
                { loginSuccess && <Message message={LOGIN_MESSAGE} /> }
                { error && <Error message={ERROR_IN_LOGIN} />}
            </div>
            </Container>
        );
    }
}

//TODO: link sign up
//TODO: nicer Button
const styles = {
    app:{
        marginTop:"10%"

    }
};
