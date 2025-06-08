import { combineReducers, configureStore } from '@reduxjs/toolkit'
import React from 'react'
import thunk from 'redux-thunk'
import productsReducer from './slices/ProductSlice.js'


const reducer = combineReducers({
    productState : productsReducer
});

const store = configureStore({
    reducer,
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(thunk)
});

export default store;



