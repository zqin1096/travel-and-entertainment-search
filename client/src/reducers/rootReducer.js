import {combineReducers} from 'redux';
import placeReducer from './placeReducer';
import favoriteReducer from './favoriteReducer';

const rootReducer = combineReducers({
    place: placeReducer,
    favorites: favoriteReducer
});
export default rootReducer;