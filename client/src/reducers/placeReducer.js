import {
    CHANGE_TAB,
    CLEAR_FORM,
    GET_PLACES,
    SET_ERROR,
    SET_LOADING
} from '../actions/types';

const initialState = {
    places: [],
    place: null,
    loading: false,
    error: null,
    activeTab: 'first'
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
                error: null,
                loading: false
            };
        case CLEAR_FORM:
            return {
                ...state,
                places: [],
                error: null,
                activeTab: 'first'
            };
        case CHANGE_TAB:
            return {
                ...state,
                activeTab: action.payload
            };
        case SET_ERROR:
            return {
                ...state,
                places: [],
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
};