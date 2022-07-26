import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/reducer';

// store: 把 reducer, action, state 整合的地方
// configureStore 再看看 怎麼寫
const store = configureStore({
    reducer: {
        rootReducer
    },
});

export default store; 