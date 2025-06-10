import { combineReducers, configureStore } from '@reduxjs/toolkit'
import React from 'react'

import productsReducer from './slices/ProductSlice.js'


const reducer = combineReducers({
    productState : productsReducer
});

const store = configureStore({
    reducer,
    
});

export default store;



