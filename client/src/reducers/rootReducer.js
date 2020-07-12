import {combineReducers} from 'redux';
import placeReducer from './placeReducer';

const rootReducer = combineReducers({
    place: placeReducer
});
export default rootReducer;