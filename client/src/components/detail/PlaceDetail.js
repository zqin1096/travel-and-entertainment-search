/*global google*/
import React, {useState, useEffect} from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import Info from './Info';
import {connect} from 'react-redux';
import Photos from './Photos';
import Alert from 'react-bootstrap/Alert';
import Reviews from './Reviews';
import axios from 'axios';
import Map from './Map';

const PlaceDetail = (props) => {
    // Google place.
    const [place, setPlace] = useState(null);
    // Yelp Place.
    const [yelp, setYelp] = useState(null);
    const getYelp = async () => {
        if (place === null) {
            return;
        }
        const fields = {};
        for (let i = 0; i < place.address_components.length; i++) {
            fields[place.address_components[i].types[0]] = place.address_components[i].short_name
        }
        const matchConfig = {
            params: {
                name: place.name,
                address1: `${fields['street_number'] ? fields['street_number'] : ''} ${fields['route'] ? fields['route'] : ''}`,
                city: fields['locality'],
                state: fields['administrative_area_level_1'],
                country: fields['country']
            }
        };
        const match = await axios.get('/api/yelp/match', matchConfig);
        if (match && match.data.businesses && match.data.businesses.length > 0) {
            const reviewsConfig = {
                params: {
                    id: match.data.businesses[0].id
                }
            };
            const res = await axios.get('/api/yelp/reviews', reviewsConfig);
            if (res && res.data.reviews) {
                const reviews = res.data.reviews.map((review, index) => {
                    return {
                        author_name: review.user.name,
                        author_url: review.user.profile_url,
                        default_order: index,
                        profile_photo_url: review.user.image_url,
                        rating: review.rating,
                        text: review.text,
                        time: new Date(review.time_created) / 1000
                    };
                });
                setYelp(reviews);
            } else {
                setYelp(null);
            }
        } else {
            setYelp(null);
        }
    }
    useEffect(() => {
        getYelp();
    }, [place]);
    let service = new google.maps.places.PlacesService(document.createElement('div'));
    useEffect(() => {
        if (props.place.place === null) {
            return;
        }
        // Clear the Google place state.
        setPlace(null);
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
    if (props.place.place === null || place === null) {
        return null;
    }
    if (place.reviews && place.reviews.length > 0) {
        // Add the default_order property to each review (Google Review).
        for (let i = 0; i < place.reviews.length; i++) {
            place.reviews[i]['default_order'] = i;
        }
    }
    return (
        <Container fluid>
            <h4 className="text-center">{place.name}</h4>
            <Tabs defaultActiveKey="info" transition={false}
                  className="justify-content-end">
                <Tab eventKey="info" title="Info">
                    <Info place={place}/>
                </Tab>
                <Tab eventKey="photos" title="Photos">
                    {
                        (place.photos && place.photos.length > 0) ?
                            <Photos photos={place.photos}/> :
                            <Alert variant="warning" className="mt-3">
                                No record.
                            </Alert>
                    }
                </Tab>
                <Tab eventKey="map" title="Map">
                    <Map place={place}/>
                </Tab>
                <Tab eventKey="reviews" title="Reviews">
                    <Reviews googleReviews={place.reviews} yelpReviews={yelp}/>
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