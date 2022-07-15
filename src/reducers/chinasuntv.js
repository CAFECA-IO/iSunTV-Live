import update from 'immutability-helper';
import * as types from '../actions/chinasunactions';

/** @param {ChinasunService} chinasunService handle the programlist related service*/
const INITIAL_ITEMS = {
    INFO: { WEEK: [], WEEK_INFO: {} }
};

// A function is used to get chinasuntv actions and update state
/**
 * get chinasuntv actions and update state
 * @param state means the passed state
 * @param action means action which is needed to be passed into the function
 */
export default function getChinaSuntv(state = INITIAL_ITEMS, action = {}) {
    
    switch (action.type) {
        
        case types.FETCH_PROGRAMLIST:
    
        return update(state, {

            INFO: { $set: action.data }
        
        });
        
        default:
        
            return state;
    
    }

}
