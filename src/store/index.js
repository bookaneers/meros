// import dependencies e libraries
import { configureStore } from "@reduxjs/toolkit";

// import components
import PartsReducer from './reducers/parts';
import OnePartReducer from './reducers/onepart';

// export a Store with configureStore from Redux and Toolkit
// a Store must have reducers in order to alter the State
export const store = configureStore({
    reducer:{
        parts:PartsReducer,
        onepart:OnePartReducer
    }
})