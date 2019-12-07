import React, {Component} from 'react';
import {Link} from "react-router-dom";
import LoginService from '../services/LoginService';
import Message from './elements/Message';
import Error from './elements/Error';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Styles from "./elements/styles";

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
            this.props.history.push("/home");
        this.setState({
            loginSuccess: true,
            error: false
        });
    };
    classes = Styles;

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
            <Container component="main" maxWidth="xs" style={styles.app}>
                <CssBaseline/>
                <div className={this.classes.paper}>
                    <Typography component="h1" variant="h5">
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

                    </form>
                    {loginSuccess && <Message message={"Login successful"}/>}
                    {error && <Error message={"Error, please try again."}/>}
                </div>
            </Container>
        );
    }
}
const styles = {
    app: {
        marginTop: "10%"
    }
};
