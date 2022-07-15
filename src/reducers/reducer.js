import { combineReducers } from 'redux';
import chinasuntv from './chinasuntv';

// put chinasun reducer into root reducer
const ROOTREDUCER = combineReducers({
    chinasuntv
});

export default ROOTREDUCER;
