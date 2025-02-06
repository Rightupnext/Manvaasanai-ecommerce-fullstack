// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducers';
import CategoryReducers from './reducers/CategorySlice';
import ProductReducers from './reducers/productReducers';
import  addToCart from './reducers/CartReducers';
const store = configureStore({
  reducer: {
    auth: userReducer,
    category:CategoryReducers,
    products:ProductReducers,
    cart:addToCart
  },
});

export default store;
