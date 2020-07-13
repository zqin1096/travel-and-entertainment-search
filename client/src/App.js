import React from 'react';
import './App.css';
import store from './store';
import {Provider} from 'react-redux';
import SearchForm from './components/form/SearchForm';
import Information from './components/information/Information';
import Container from 'react-bootstrap/Container';

function App() {
    return (
        <Provider store={store}>
            <Container>
                <SearchForm/>
            </Container>
            <Container fluid>
                <Information/>
            </Container>
        </Provider>
    );
}

export default App;
