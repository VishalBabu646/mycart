import { combineReducers, configureStore } from '@reduxjs/toolkit'
import React from 'react'
import {thunk} from 'redux-thunk'

const reducer = combineReducers({});

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk)
});

export default store;



