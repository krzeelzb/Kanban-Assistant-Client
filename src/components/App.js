import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Login from './Login';
import Registration from './Registration';
import Home from './Home'
import PrivateRoute from './PrivateRoute'

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App" style={styles.app} >
                    <Switch>
                        <Route exact path="/register" component={Registration} />
                        <Route exact path="/login" component={Login} />
                        {/*<Redirect from="/" to="login" />*/}
                        {/*<PrivateRoute path="/home" component={Home} />*/}
                        <Route exact path="/home" component={Home} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
export default App;
const styles = {
    app:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop:"10%"

    }
};
