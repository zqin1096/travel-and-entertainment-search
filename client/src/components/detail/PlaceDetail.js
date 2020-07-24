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
import {IoIosArrowBack} from 'react-icons/io';
import Button from 'react-bootstrap/Button';
import {clearPlace} from '../../actions/placeAction';
import {IconContext} from 'react-icons';
import {AiFillStar, AiOutlineStar} from 'react-icons/ai';
import {addFavorite, removeFavorite} from '../../actions/favoriteAction';
import Twitter from './Twitter.png';

const PlaceDetail = (props) => {
    // Google place.
    const [place, setPlace] = useState(null);
    // Yelp Place.
    const [yelp, setYelp] = useState(null);

    // Get Yelp reviews.
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
        // Use the place information from Google services to find a match at
        // Yelp.
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
        // Execute the side effect when the Google place state changes.
        getYelp();
    }, [place]);

    // Get the Google place information.
    let service = new google.maps.places.PlacesService(document.createElement('div'));
    useEffect(() => {
        // Check if the place ID exists.
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
    const addFavorite = (place) => {
        props.addFavorite({
            category: place.icon,
            name: place.name,
            address: place.vicinity,
            place_id: place.place_id
        });
    };

    const removeFavorite = (place) => {
        props.removeFavorite(place.place_id);
    }
    if (props.place.place === null || place === null) {
        return null;
    }
    if (place.reviews && place.reviews.length > 0) {
        // Add the default_order property to each review (Google Review).
        for (let i = 0; i < place.reviews.length; i++) {
            place.reviews[i]['default_order'] = i;
        }
    }
    const isFavorite = props.favorites.favorites.find((favorite) => {
        return favorite.place_id === place.place_id;
    });
    return (
        <Container fluid>
            <h4 className="text-center">{place.name}</h4>
            <Container fluid style={{padding: 0}}>
                <Button variant="light" className="border">
                    <IoIosArrowBack onClick={() => {
                        props.clearPlace();
                    }}/>List
                </Button>
                <Button className="border float-right mx-1"
                        style={{padding: 0}}>
                    <a className="twitter-share-button"
                       target="_blank"
                       rel="noopener noreferrer"
                       href={`https://twitter.com/intent/tweet?text=${`Check out ${place.name} located at ${place.vicinity}. Website: ${place.website}`}&hashtags=${['TravelAndEntertainmentSearch']}`}>
                        <img src={Twitter} alt="tweet" style={{
                            width: '42px',
                            height: '38px',
                            borderRadius: '2px'
                        }}/>
                    </a>
                </Button>
                <Button variant="light" className="border float-right">
                    {isFavorite ?
                        <IconContext.Provider
                            value={{
                                color: '#FED62F'
                            }}>
                            <AiFillStar onClick={() => {
                                removeFavorite(place)
                            }}/>
                        </IconContext.Provider> :
                        <AiOutlineStar onClick={() => {
                            addFavorite(place);
                        }}/>}
                </Button>
            </Container>
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
        place: state.place,
        favorites: state.favorites
    }
};

export default connect(mapStateToProps, {
    clearPlace,
    addFavorite,
    removeFavorite
})(PlaceDetail);