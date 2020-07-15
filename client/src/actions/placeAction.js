import {
    GET_PLACES,
    SET_ERROR,
    SET_LOADING,
    CLEAR_FORM,
    CHANGE_TAB, NEXT_PAGE, PREV_PAGE
} from './types';
import axios from 'axios';
import {milesToMeters} from '../utility';

export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};

export const clearForm = () => {
    return {
        type: CLEAR_FORM,
    };
};

export const changeTab = (tab) => {
    return {
        type: CHANGE_TAB,
        payload: tab
    };
};

export const nextPage = () => {
    return {
        type: NEXT_PAGE
    };
};

export const prevPage = () => {
    return {
        type: PREV_PAGE
    };
};

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
                // dispatch({
                //     type: GET_PLACES,
                //     payload: response.data.results
                // });
                payload.push(response.data.results);
            } else {
                dispatch({
                    type: SET_ERROR,
                    payload: status
                });
            }
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