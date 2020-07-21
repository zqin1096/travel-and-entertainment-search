/*global google*/
import React, {useEffect, useRef, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import classes from './Map.module.css';
import Container from 'react-bootstrap/Container';
import Pegman from './Pegman.png';
import MapIcon from './Map.png';
import Figure from 'react-bootstrap/Figure';

const Map = (props) => {
    const [mode, setMode] = useState('Driving');
    const [showStreetView, setStreetView] = useState(false);
    // Reference to the container that contains the Google Map.
    const mapRef = useRef(null);
    // Store the Map object in the ref.current.
    const ref = useRef(null);
    const coordinate = {
        lat: props.place.geometry.location.lat(),
        lng: props.place.geometry.location.lng()
    };
    console.log(coordinate);
    const createGoogleMap = () =>
        new google.maps.Map(mapRef.current, {
            zoom: 15,
            center: coordinate,
        });
    const createMarker = () =>
        new google.maps.Marker({
            position: coordinate,
            map: ref.current
        });
    const panoramaRef = useRef(null);
    useEffect(() => {
        console.log('run');
        ref.current = createGoogleMap();
        createMarker();
        panoramaRef.current = ref.current.getStreetView();
        panoramaRef.current.setPosition(coordinate);
        panoramaRef.current.setPov(
            /** @type {google.maps.StreetViewPov} */ ({
                heading: 265,
                pitch: 0
            })
        );
    }, [props.place]);
    const toggleStreetView = () => {
        const toggle = panoramaRef.current.getVisible();
        if (toggle === false) {
            setStreetView(true);
            panoramaRef.current.setVisible(true);
        } else {
            setStreetView(false);
            panoramaRef.current.setVisible(false);
        }
    }
    return (
        <Container fluid style={{padding: 0}}>
            <Form className="mt-3">
                <Form.Row>
                    <Form.Group as={Col} xs={12} md={3} lg={4}>
                        <Form.Label><strong>From</strong></Form.Label>
                        <Form.Control placeholder="Your location"/>
                    </Form.Group>

                    <Form.Group as={Col} xs={12} md={3} lg={4}>
                        <Form.Label><strong>To</strong></Form.Label>
                        <Form.Control type="text"
                                      value={`${props.place.name}, ${props.place.formatted_address}`}
                                      readOnly/>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={3} lg={2}>
                        <Form.Label><strong>Travel Mode</strong></Form.Label>
                        <DropdownButton
                            className={classes.selectButton}
                            title={mode}>
                            <Dropdown.Item
                                eventKey="Driving"
                                onSelect={(key) => setMode(key)}>
                                Driving
                            </Dropdown.Item>
                            <Dropdown.Item
                                eventKey="Bicycling"
                                onSelect={(key) => setMode(key)}>
                                Bicycling
                            </Dropdown.Item>
                            <Dropdown.Item
                                eventKey="Transit"
                                onSelect={(key) => setMode(key)}>
                                Transit
                            </Dropdown.Item>
                            <Dropdown.Item
                                eventKey="Walking"
                                onSelect={(key) => setMode(key)}>
                                Walking
                            </Dropdown.Item>
                        </DropdownButton>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={3} lg={2}
                                className="d-flex align-items-end">
                        <Button variant="primary" className={classes.direction}>
                            Get directions
                        </Button>
                    </Form.Group>
                </Form.Row>
            </Form>
            <Figure className={classes.pegman} onClick={toggleStreetView}>
                <Figure.Image
                    width={36}
                    height={36}
                    src={showStreetView ? MapIcon : Pegman} alt="54x54"/>
            </Figure>
            <Container fluid ref={mapRef}
                       style={{height: '400px'}}/>
        </Container>
    )
};

export default Map;