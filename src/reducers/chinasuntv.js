import update from 'immutability-helper';
import * as types from '../actions/chinasunactions';

const initialItems = {
    info: { week: [], weekInfo: {} }
};

// get chinasun tv states and action
export default function getChinaSuntv(state = initialItems, action = {})
{
    switch (action.type)
    {
        case types.FETCH_PROGRAMLIST:
            return update(state, {
                info: { $set: action.data }
            });
        default:
            return state;
    }
}
