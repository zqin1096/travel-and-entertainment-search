import React from 'react';
import './App.css';
import store from './store';
import {Provider} from 'react-redux';
import SearchForm from './components/form/SearchForm';

function App() {
    return (
        <Provider store={store}>
            <SearchForm/>
        </Provider>
    );
}

export default App;
