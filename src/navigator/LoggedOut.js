import * as React from 'react';

import { createStackNavigator } from 'react-navigation'
import Registration from '../Screens/CustomerRegistration/Registration'
import WalkingView from '../Screens/WalkingView'
import TermsAndCondition from '../Screens/TermsAndCondition'
import OTPVerify from '../Screens/CustomerRegistration/OtpVerify'

import Header from '../Components/header'
import TestRegistration from '../Screens/TestRegistration'
import VersionUpdate from '../Screens/VersionUpdate'



const LoggedOutNavigator = createStackNavigator(
    {
     
  
      registration: {
  
        screen: Registration,
        navigationOptions: ({ navigation }) => ({

            header : <Header title = "Registration" navigation = {navigation} leftButton = {false} />

        }),
      },
      walkingview: {
  
        screen: WalkingView,
  
      },
      testRegistration: {
  
        screen: TestRegistration,
  
      },
      otpVerify: {
  
        screen: OTPVerify,

        navigationOptions: ({ navigation }) => ({
        header : <Header title = "OTP Verify" navigation = {navigation} leftButton = {true} />
          }),

      },
      termsCondition: {
  
        screen: TermsAndCondition,
        navigationOptions: ({ navigation }) => ({
          header : <Header title = "OTP Verify" navigation = {navigation} leftButton = {true} />
            }),
      },

      versionUpdate: {
  
        screen: VersionUpdate,
      },

    },
    
    {
      initialRouteName: 'versionUpdate',
    },
    {
      defaultNavigationOptions: {
  
      },
    }
  );



export default LoggedOutNavigator
