/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Alert} from 'react-native';
import Header from './src/Components/header'
import AppContainer from './src/Routes/routes'
import Root from './src/Routes/Root'
import firebase from 'react-native-firebase';
import { createStackNavigator } from 'react-navigation';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//import store from './src/Redux/store'
import AppCustomReducer from './src/Redux/reducer'
import { Provider, connect } from 'react-redux';
import MainRoot from './src/Routes/MainRoot'

type Props = {};


export default class App extends Component<Props> {

  render() {
    return (
    <MainRoot />
    );
  }
}


