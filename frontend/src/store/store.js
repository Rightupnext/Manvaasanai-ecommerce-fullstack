// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducers';
import CategoryReducers from './reducers/CategorySlice';
import ProductReducers from './reducers/productReducers';
import  addToCart from './reducers/CartReducers';
import modalReducers from './reducers/modalSlice'
const store = configureStore({
  reducer: {
    auth: userReducer,
    category:CategoryReducers,
    products:ProductReducers,
    cart:addToCart,
    modal: modalReducers,
  },
});

export default store;
