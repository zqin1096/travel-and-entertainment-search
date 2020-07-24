import {ADD_FAVORITE, REMOVE_FAVORITE} from '../actions/types';

const initialState = {
    favorites: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAVORITE:
            return {
                ...state,
                favorites: [...state.favorites, action.payload],
            };
        case REMOVE_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.filter((favorite) => {
                    return favorite.place_id !== action.payload;
                })
            };
        default:
            return state;
    }
};