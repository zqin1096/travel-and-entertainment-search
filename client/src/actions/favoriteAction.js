import {
    ADD_FAVORITE,
    REMOVE_FAVORITE
} from './types';

export const addFavorite = (place) => {
    return {
        type: ADD_FAVORITE,
        payload: place
    };
};

export const removeFavorite = (place) => {
    return {
        type: REMOVE_FAVORITE,
        payload: place
    };
};