import { combineReducers } from 'redux';
import chinasuntv from './chinasuntv';

// put chinasun reducer into root reducer
const rootReducer = combineReducers({
    chinasuntv
});

export default rootReducer;
