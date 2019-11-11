
import React from 'react';

import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import store from "./store"

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Provider store={store}>
    <App/></Provider>, document.getElementById('root'));

serviceWorker.unregister();
