import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import MainComponent from '../components/MainComponent';
import configureStore from '../redux/store';


const initialState = {
    barList: [],
};
const store = configureStore(initialState);

render(
    <Provider store={store}>
        <MainComponent store={store} />
    </Provider>,
    document.getElementById('AppContainer'),
);
