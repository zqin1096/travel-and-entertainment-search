import {
    CHANGE_TAB,
    CLEAR_FORM, CLEAR_PLACE, GET_PLACE,
    GET_PLACES, NEXT_PAGE, PREV_PAGE,
    SET_ERROR,
    SET_LOADING, SET_ORIGIN
} from '../actions/types';

const initialState = {
    places: [],
    place: null,
    loading: false,
    error: null,
    activeTab: 'first',
    currentPage: 0,
    totalPages: 0,
    origin: ''
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
                loading: false,
                currentPage: 1,
                totalPages: action.payload.length
            };
        case GET_PLACE:
            return {
                ...state,
                place: action.payload
            };
        case CLEAR_FORM:
            return {
                ...state,
                places: [],
                place: null,
                error: null,
                activeTab: 'first',
                currentPage: 0,
                totalPages: 0,
                origin: ''
            };
        case CHANGE_TAB:
            return {
                ...state,
                place: null, /* Set the place_id to null to prevent
                 rendering the details */
                activeTab: action.payload
            };
        case NEXT_PAGE:
            return {
                ...state,
                currentPage: state.currentPage + 1
            };
        case PREV_PAGE:
            return {
                ...state,
                currentPage: state.currentPage - 1
            };
        case SET_ERROR:
            return {
                ...state,
                places: [],
                error: action.payload,
                loading: false
            };
        case SET_ORIGIN:
            return {
                ...state,
                origin: action.payload
            };
        case CLEAR_PLACE:
            return {
                ...state,
                place: null
            };
        default:
            return state;
    }
};