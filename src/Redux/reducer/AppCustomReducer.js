import React, { Component } from 'react'
import { View, ActivityIndicator, StyleSheet, StatusBar } from 'react-native'

import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE
} from '../action';
import { setExpoStatusBarHeight } from 'react-navigation-collapsible';






const initalState = {

 
  loadList: [],
  checkVersionResponse:[],
 
  userInformationList:[],

  getCity:[],
  getBrand:[],
  getModel:[],
  getBranch:[],

  registerWithNewVehicle:[],


  checkTermsSection:false,

  isLoadingItems:false,

  items: [],
  loading: false,
  error: null
};

const AppCustomReducer = (state = initalState, action) => {

  switch (action.type) {


    case FETCH_PRODUCTS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.

    

      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_PRODUCTS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
    


      console.log("Successs Called You")

      console.log(action.payload)


      return {
        ...state,
        loading: false,
        items: action.payload
      };

    case FETCH_PRODUCTS_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the items around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: []
      };






    case 'LOAD_TASK':

      console.log("Reducer Called")

      return {
        ...state,
        loadList: action.payload,
        loading: false,
        items: action.payload,
      };

      

      case 'CheckAppVersion':

      console.log("Check App version Called")

      return {
        ...state,
        checkVersionResponse: action.payload,
        loading: false,
        
      };


      case 'GetCity':

      console.log("GET CITY")

      return {
        ...state,
        getCity: action.payload,
        loading: false,
        
      };

      case 'GetModel':

      console.log("GET Model")

      return {
        ...state,
        getModel: action.payload,
        loading: false,
        
      };

      case 'GetBrands':

      console.log("GET Brand")

      return {
        ...state,
        getBrand: action.payload,
        loading: false,
        
      };

      case 'GetBranch':

      console.log("GET Branch")

      return {
        ...state,
        getBranch: action.payload,
        loading: false,
        
      };
      case 'RegisterCustWithNovehicle':

      console.log("Register Customer No Vehicle")

      return {
        ...state,
        registerWithNewVehicle: action.payload,
        loading: false,

      };

      case 'CheckTermsAndCondition':

      console.log("CheckTermsAndCondition Reducer")
      console.log(action.payload)

      return {
        ...state,
        checkTermsSection: action.payload,
        loading: false,
      };

  }
  return state;
};


export default AppCustomReducer
