/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';





import thunk from 'redux-thunk';
import AppCustomReducer from '../Redux/reducer/AppCustomReducer'

import store from '../Redux/store'
import appReducers from '../Redux/reducer'

import { connect,Provider } from 'react-redux';
import VersionUpdate from '../Screens/VersionUpdate'
import Root from './Root'

type Props = {};



// const store = createStore(
//   AppCustomReducer,
//   applyMiddleware(thunk),
// );







export default class MainRoot extends Component<Props> {

  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>


    );
  }
}



