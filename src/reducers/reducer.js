import { combineReducers } from 'redux';
import chinasuntv from './chinasuntv';

// put chinasun reducer into root reducer
const rootProducer = combineReducers({
    chinasuntv
});

export default rootProducer;
