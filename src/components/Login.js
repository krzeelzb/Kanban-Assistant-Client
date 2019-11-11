import React, {Component} from 'react';
import {Link} from "react-router-dom";
import LoginService from '../services/LoginService';
import Message from './elements/Message';
import Error from './elements/Error';
import {ERROR_IN_LOGIN, LOGIN_FIELDS, LOGIN_MESSAGE} from './MessageBundle';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

export default class Login extends Component {
    handleOnChangeEmail = (e) => {
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
        if (loginResult !== 200) {
            this.setState({
                error: true,
                loginSuccess: false
            });
        }
        else
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

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: false,
            loginSuccess: false
        }
    }

    render() {
        const {loginSuccess, error} = this.state;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
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

                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>

                        <button className={this.classes.submit} type="button"
                                onClick={this.onSubmit}>{LOGIN_FIELDS.LOGIN}</button>

                    </form>
                    {loginSuccess && <Message message={LOGIN_MESSAGE}/>}
                    {error && <Error message={ERROR_IN_LOGIN}/>}
                </div>
            </Container>
        );
    }
}
