import {
    CHANGE_TAB,
    CLEAR_FORM, GET_PLACE,
    GET_PLACES, NEXT_PAGE, PREV_PAGE,
    SET_ERROR,
    SET_LOADING
} from '../actions/types';

const initialState = {
    places: [],
    place: null,
    loading: false,
    error: null,
    activeTab: 'first',
    currentPage: 0,
    totalPages: 0
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
                error: null,
                activeTab: 'first',
                currentPage: 0,
                totalPages: 0
            };
        case CHANGE_TAB:
            return {
                ...state,
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
        default:
            return state;
    }
};