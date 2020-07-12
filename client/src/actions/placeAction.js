import {
    GET_PLACES,
    SET_LOADING
} from './types';
import axios from 'axios';
import {milesToMeters} from '../utility';

export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};

export const getPlaces = (formData) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading());
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
            dispatch({
                type: GET_PLACES,
                payload: response.data
            });
        } catch (e) {

        }
    };
};