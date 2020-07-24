import {
    ADD_FAVORITE,
    REMOVE_FAVORITE
} from './types';

// Add a favorite place.
export const addFavorite = (place) => {
    return {
        type: ADD_FAVORITE,
        payload: place
    };
};

// Remove a favorite place.
export const removeFavorite = (placeId) => {
    return {
        type: REMOVE_FAVORITE,
        payload: placeId
    };
};