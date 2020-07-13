import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import {loadState, saveState} from './localStorage';

const middleware = [thunk];
const persistedState = loadState();
const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(applyMiddleware(...middleware))
);
store.subscribe(() => {
    // Save the state to local storage every time the state changes.
    saveState(store.getState().favorites);
});
export default store;