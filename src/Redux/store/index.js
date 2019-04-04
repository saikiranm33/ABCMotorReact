import React, { Component } from 'react'

import { createStore, applyMiddleware,combineReducers } from 'redux';
import appReducer from '../reducer'
import thunk from 'redux-thunk';
//import AppCustomReducer from '../reducer/AppCustomReducer'
// import {
//   reduxifyNavigator,
//   createReactNavigationReduxMiddleware,
//   createNavigationReducer,
// } from 'react-navigation-redux-helpers';


const store = createStore(
  appReducer,
  applyMiddleware(thunk),
);


export default store;