import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
const axios = require('axios');
export default function withAuth(ComponentToProtect) {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false,
            };
        }
        componentDidMount() {
            console.log(sessionStorage.getItem("jwtToken"));

            return  axios("http://localhost:5000/api/users/current",{'headers':{'Authorization':sessionStorage.getItem("jwtToken")}})
                .then(res => {
                    if (res.status === 200) {
                        console.log("oooooooooooooooooookkkkkkkkkkkkkkkkkkk");
                        this.setState({ loading: false });
                    } else {
                        console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnn");

                        const error = new Error(res.error);
                        throw error;
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.setState({ loading: false, redirect: true });
                });
        }
        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to="/login" />;
            }
            console.log(this.props);
            return <ComponentToProtect {...this.props} />;
        }
    }
}
