/*global google*/
import React, {useState, useRef, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import classes from './SearchForm.module.css';
import {FaSearch} from 'react-icons/fa';
import {getPlaces, clearForm} from '../../actions/placeAction';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const SearchForm = (props) => {
    const options = [
        'Default',
        'Airport',
        'Amusement Park',
        'Aquarium',
        'Art Gallery',
        'Bakery',
        'Bar',
        'Beauty Salon',
        'Bowing Alley',
        'Bus Station',
        'Cafe',
        'Campground',
        'Car Rental',
        'Casino',
        'Lodging',
        'Movie Theater',
        'Museum',
        'Night Club',
        'Park',
        'Parking',
        'Restaurant',
        'Shopping Mall',
        'Stadium',
        'Subway Station',
        'Taxi Stand',
        'Train Station',
        'Transit Station',
        'Travel Agency',
        'Zoo'
    ];
    const [formData, setFormData] = useState({
        keyword: '',
        category: 'Default',
        distance: '10',
        from: 'current',
        location: ''
    });
    const {
        keyword,
        category,
        distance,
        from,
        location
    } = formData;
    const [touched, setTouched] = useState({
        keyword: false,
        location: false
    });
    const onBlur = (field) => {
        setTouched({
            ...touched,
            [field]: true
        });
    };
    const onChange = (event) => {
        setFormData({
                ...formData,
                [event.target.name]: event.target.value
            }
        );
    };
    const onSubmit = (event) => {
        event.preventDefault();
        props.getPlaces(formData);
    };

    const onClear = () => {
        setFormData({
            ...formData,
            keyword: '',
            category: 'Default',
            distance: '10',
            from: 'current',
            location: ''
        });
        setTouched({
            ...touched,
            keyword: false,
            location: false
        });
        props.clearForm();
    };

    const onPlaceSelected = () => {
        const place = autocomplete.getPlace();
        const address = place.formatted_address;
        setFormData({
            ...formData,
            location: address
        });
    }

    let autocomplete;
    let autocompleteRef = useRef(null);
    // Need to enable Google Maps JavaScript API.
    useEffect(() => {
        autocomplete = new google.maps.places.Autocomplete(autocompleteRef.current,
            {"types": ["geocode"], componentRestrictions: {country: "us"}});
        autocomplete.addListener("place_changed", () => {
            // Prevent calling onPlaceSelected() if the user press "enter".
            if (!autocomplete.getPlace().formatted_address) {
                return;
            }
            onPlaceSelected();
        });
    }, [formData]);

    return (
        <Container className={`mt-3 border rounded ${classes.formContainer}`}>
            <Form className={`${classes.form}`}
                  onKeyPress={(event) => {
                      if (event.which === 13 /* Enter */) {
                          // Prevent submitting the form from pressing the
                          // enter key.
                          event.preventDefault();
                      }
                  }}
                  onSubmit={(event) => onSubmit(event)}>
                <Form.Row>
                    <Col lg={3}/>
                    <Col xs={12} lg={9}>
                        <h3 className={classes.formTitle}>
                            Travel and Entertainment Search
                        </h3>
                    </Col>
                </Form.Row>
                <Form.Group>
                    <Form.Row>
                        <Col xs={12} lg={3}>
                            <Form.Label className={classes.required}>
                                Keyword
                            </Form.Label>
                        </Col>
                        <Col xs={12} lg={9}>
                            <Form.Control value={keyword}
                                          name="keyword"
                                          required
                                          isInvalid={touched.keyword && !keyword.replace(/\s/g, '').length}
                                          onBlur={() => onBlur('keyword')}
                                          onChange={(event) => onChange(event)}/>
                            <div className="invalid-feedback">
                                Please enter a keyword.
                            </div>
                        </Col>
                    </Form.Row>
                </Form.Group>
                <Form.Group>
                    <Form.Row>
                        <Col xs={12} lg={3}>
                            <Form.Label>
                                Category
                            </Form.Label>
                        </Col>
                        <Col xs={12} lg={6}>
                            <Form.Control as="select"
                                          value={category}
                                          name="category"
                                          onChange={(event => onChange(event))}>
                                {options.map((option) => {
                                    return <option value={option}
                                                   key={option}>{option}
                                    </option>
                                })}
                            </Form.Control>
                        </Col>
                    </Form.Row>
                </Form.Group>
                <Form.Group>
                    <Form.Row>
                        <Col xs={12} lg={3}>
                            <Form.Label>
                                Distance (miles)
                            </Form.Label>
                        </Col>
                        <Col xs={12} lg={6}>
                            <Form.Control placeholder="10" value={distance}
                                          name="distance"
                                          onChange={(event) => onChange(event)}/>
                        </Col>
                    </Form.Row>
                </Form.Group>
                <Form.Group>
                    <Form.Row>
                        <Col xs={12} lg={3}>
                            <Form.Label className={classes.required}>
                                From
                            </Form.Label>
                        </Col>
                        <Col xs={12} lg={9}>
                            <Form.Check
                                type="radio"
                                id="current"
                                value="current"
                                label="Current location"
                                name="from"
                                checked={from === 'current'}
                                onChange={(event) => onChange(event)}
                            />
                            <Form.Check
                                type="radio"
                                id="other"
                                value="other"
                                label="Other. Please specify:"
                                name="from"
                                checked={from === 'other'}
                                onChange={(event) => onChange(event)}
                            />
                            <Form.Control disabled={from === 'current'}
                                          placeholder="Enter a location"
                                          name="location"
                                          value={location}
                                          ref={autocompleteRef}
                                          required
                                          isInvalid={touched.location && !location.replace(/\s/g, '').length && from === 'other'}
                                          onChange={(event) => onChange(event)}
                                          onBlur={() => onBlur('location')}/>
                            <div className="invalid-feedback">
                                Please enter a location.
                            </div>
                        </Col>
                    </Form.Row>
                </Form.Group>
                <Form.Group>
                    <Form.Row>
                        <Button variant="primary" type="submit" className="mx-1"
                                disabled={!keyword.replace(/\s/g, '').length || (from === 'other' && !location.replace(/\s/g, '').length)}>
                            <FaSearch/> Search
                        </Button>
                        <Button variant="outline-secondary" onClick={onClear}>
                            Clear
                        </Button>
                    </Form.Row>
                </Form.Group>
            </Form>
        </Container>
    );
};

SearchForm.propTypes = {
    getPlaces: PropTypes.func.isRequired
}

export default connect(null, {getPlaces, clearForm})(SearchForm);