import {GET_PLACES, SET_LOADING} from '../actions/types';

const initialState = {
    places: [],
    place: null,
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_PLACES:
            return {
                ...state,
                places: action.payload,
                loading: false
            };
        default:
            return state;
    }
};