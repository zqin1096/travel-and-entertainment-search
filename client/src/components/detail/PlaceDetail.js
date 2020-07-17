/*global google*/
import React, {useState, useEffect} from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import Info from './Info';
import {connect} from 'react-redux';

const PlaceDetail = (props) => {
    const [place, setPlace] = useState(null);
    let service = new google.maps.places.PlacesService(document.createElement('div'));
    useEffect(() => {
        if (props.place.place === null) {
            return;
        }
        service.getDetails({
            placeId: props.place.place
        }, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                setPlace(place);
            } else {
                console.log(status);
            }
        });
    }, [props.place.place]);
    if (place === null) {
        return null;
    }
    return (
        <Container fluid>
            <Tabs defaultActiveKey="info" transition={false}
                  className="justify-content-end">
                <Tab eventKey="info" title="Info">
                    <Info place={place}/>
                </Tab>
                <Tab eventKey="photos" title="Photos">

                </Tab>
                <Tab eventKey="map" title="Map">

                </Tab>
                <Tab eventKey="reviews" title="Reviews">

                </Tab>
            </Tabs>

        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        place: state.place
    }
};

export default connect(mapStateToProps)(PlaceDetail);