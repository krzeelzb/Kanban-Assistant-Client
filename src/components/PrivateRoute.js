import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
const PrivateRoute = ({ component: Component, ...rest }) => {
    {console.log(Component)}
    return (

        <Route
            {...rest}

            render={props =>
                localStorage.getItem('jwtToken')? <Component {...props} /> : <Redirect to={'/'} />
            }
        />
    );
};

// const mapStateToProps = state => {
//     return {
//         auth: state.auth,
//     };
// };
export default (PrivateRoute);
