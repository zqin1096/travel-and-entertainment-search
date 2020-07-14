import React from 'react';
import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Results from '../result/Results';
import {connect} from 'react-redux';
import ProgressBar from 'react-bootstrap/ProgressBar';
import classes from './Information.module.css'
import Favorites from '../favorite/Favorites';
import Alert from 'react-bootstrap/Alert';

const Information = (props) => {
    return (
        <Container className={`mt-3 ${classes.result}`} fluid>
            <Tab.Container defaultActiveKey="first">
                <Row className="d-flex justify-content-center mb-5">
                    <Nav variant="pills">
                        <Nav.Item>
                            <Nav.Link eventKey="first">Results</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">Favorites</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Row>
                {props.place.loading ?
                    <ProgressBar animated now={45}/> :
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            {(!props.place.loading && props.place.places.length > 0) ?
                                <Results
                                    places={props.place.places}/> : props.place.error === 'ZERO_RESULTS' ?
                                    <Alert variant="warning">
                                        No record.
                                    </Alert> : props.place.error !== null ?
                                        <Alert variant="danger">
                                            Failed to get search results.
                                        </Alert> : null}
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            {props.favorites.favorites.length > 0 ?
                                <Favorites
                                    favorites={props.favorites.favorites}/> :
                                <Alert variant="warning">
                                    No record.
                                </Alert>}
                        </Tab.Pane>
                    </Tab.Content>
                }
            </Tab.Container>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        place: state.place,
        favorites: state.favorites
    };
};

export default connect(mapStateToProps)(Information);