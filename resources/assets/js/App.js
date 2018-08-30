import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import store from './store';
import HomeContainer from './home/HomeContainer';

const App = () => {
    return (
        <div className="app">
            Hey!
            <HomeContainer />
        </div>
    )
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);