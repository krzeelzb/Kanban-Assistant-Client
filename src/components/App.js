import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Login from './Login';
import Registration from './Registration';
import Home from './HomeComponent'
import withAuth from "./withAuth";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App"  >
                    <Switch>
                        <Route exact path="/register" component={Registration} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/home" component={withAuth(Home)} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
export default App;
