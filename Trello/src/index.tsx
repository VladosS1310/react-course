import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import {App} from './components/App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "./store";


const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, document.getElementById('root')
);