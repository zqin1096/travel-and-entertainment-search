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
import {changeTab, nextPage, prevPage} from '../../actions/placeAction';
import Button from 'react-bootstrap/Button';
import PlaceDetail from '../detail/PlaceDetail';

const Information = (props) => {
    return (
        <Container className={`mt-3 ${classes.result}`} fluid>
            <Tab.Container
                activeKey={props.place.activeTab}
                onSelect={(key) => {
                    props.changeTab(key);
                }}>
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
                            {(props.place.place === null && !props.place.loading && props.place.places.length > 0) ?
                                <Results
                                    places={props.place.places[props.place.currentPage - 1]}/> : props.place.error === 'ZERO_RESULTS' ?
                                    <Alert variant="warning">
                                        No record.
                                    </Alert> : props.place.error !== null ?
                                        <Alert variant="danger">
                                            Failed to get search results.
                                        </Alert> :
                                        null
                            }
                            <div className="text-center pb-5">
                                <div>
                                    {
                                        props.place.place === null &&
                                        props.place.currentPage > 1 &&
                                        <Button
                                            variant="light"
                                            className="border mx-3"
                                            onClick={props.prevPage}>
                                            Previous
                                        </Button>
                                    }
                                    {
                                        props.place.place === null &&
                                        props.place.currentPage < props.place.totalPages &&
                                        <Button
                                            variant="light"
                                            className="border"
                                            onClick={props.nextPage}>
                                            Next
                                        </Button>
                                    }
                                </div>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            {props.place.place === null && props.favorites.favorites.length > 0 ?
                                <Favorites
                                    favorites={props.favorites.favorites}/> : props.place.place === null ?
                                    <Alert variant="warning">
                                        No record.
                                    </Alert> : null}
                        </Tab.Pane>
                    </Tab.Content>
                }
            </Tab.Container>
            <PlaceDetail/>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        place: state.place,
        favorites: state.favorites
    };
};

export default connect(mapStateToProps, {
    changeTab,
    nextPage,
    prevPage
})(Information);