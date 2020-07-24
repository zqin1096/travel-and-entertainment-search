import {
    GET_PLACES,
    SET_ERROR,
    SET_LOADING,
    CLEAR_FORM,
    CHANGE_TAB,
    NEXT_PAGE,
    PREV_PAGE,
    GET_PLACE,
    SET_ORIGIN,
    CLEAR_PLACE
} from './types';
import axios from 'axios';
import {milesToMeters} from '../utility';

// Set loading to true.
export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};

// Clear the form and the results.
export const clearForm = () => {
    return {
        type: CLEAR_FORM,
    };
};

// Change the to Results or Favorites tab.
export const changeTab = (tab) => {
    return {
        type: CHANGE_TAB,
        payload: tab
    };
};

// Go to the next page if there is more data.
export const nextPage = () => {
    return {
        type: NEXT_PAGE
    };
};

// Store the id of the place in redux.
export const getPlace = (placeId) => {
    return {
        type: GET_PLACE,
        payload: placeId
    };
};

// Go to the previous page.
export const prevPage = () => {
    return {
        type: PREV_PAGE
    };
};

export const setOrigin = (origin) => {
    return {
        type: SET_ORIGIN,
        payload: origin
    }
};

export const clearPlace = () => {
    return {
        type: CLEAR_PLACE
    }
};

// Get the places based on the form input.
export const getPlaces = (formData) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading());
            dispatch(clearForm());
            let res;
            if (formData.from === 'current') {
                res = await axios.get('/api/places/current_location');
            } else {
                const locationConfig = {
                    params: {
                        location: formData.location
                    }
                };
                res = await axios.get('/api/places/geocode', locationConfig);
            }
            // If res.data only contains the latitude and longitude if there
            // was no error.
            if (res.data.status) {
                dispatch({
                    type: SET_ERROR,
                    payload: res.data.status
                });
                return;
            }
            const {latitude, longitude} = res.data;
            const radius = formData.distance.replace(/\s/g, '').length ? milesToMeters(Number(formData.distance)) : milesToMeters(10);
            const searchConfig = {
                params: {
                    keyword: formData.keyword,
                    type: formData.type,
                    latitude: latitude,
                    longitude: longitude,
                    radius: radius
                }
            };
            const response = await axios.get('/api/places/search', searchConfig);
            const payload = [];
            const status = response.data.status;
            if (status === 'OK') {
                payload.push(response.data.results);
            } else {
                dispatch({
                    type: SET_ERROR,
                    payload: status
                });
            }
            dispatch(setOrigin(formData.from === 'current' ? 'My location' : formData.location));
            let token = response.data.next_page_token;
            while (token) {
                let next_page = await axios.get(`/api/places/additional_results/${token}`);
                // There is a short delay between when a next_page_token is
                // issued, and when it will become valid. Requesting the next
                // page before it is available will return an INVALID_REQUEST
                // response. Retrying the request with the same next_page_token
                // will return the next page of results.
                while (next_page.data.status === 'INVALID_REQUEST') {
                    next_page = await axios.get(`/api/places/additional_results/${token}`);
                }
                payload.push(next_page.data.results);
                token = next_page.data.next_page_token;
            }
            dispatch({
                type: GET_PLACES,
                payload: payload
            });
        } catch (e) {

        }
    };
};