import React, { Component } from 'react';
import Home from './Home'
export default class HomeComponent extends Component {
    constructor() {
        super();
        this.state = {
            message: 'Loading...'
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
               <Home/>
            </div>
        );
    }
}
