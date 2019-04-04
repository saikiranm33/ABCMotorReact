import * as React from 'react';
import { createBottomTabNavigator, createAppContainer, createStackNavigator, Text } from 'react-navigation';
import Registration from '../Screens/CustomerRegistration/Registration'
import WalkingView from '../Screens/WalkingView'
import TermsAndCondition from '../Screens/TermsAndCondition'
import DashboardView from '../Screens/Dashboard'
import OTPVerify from '../Screens/CustomerRegistration/OtpVerify'
//import TestRegistration from '../Screens/TestRegistration'
import CustomTabNavigator from './CustomTabNavigator'
import DrivingSchool from '../Screens/DrivingSchool'
import ReferralRedemption from '../Screens/ReferralRedemption'
import Finance from '../Screens/Finance'
import Accessories from '../Screens/Accessories'
import Insurance from '../Screens/Insurance'
import CustomFlatList from '../Components/customFlatList'
import NewCarList from '../Screens/NewCarScreens/NewCarList'
import NewVariantList from '../Screens/NewCarScreens/NewVariantList'
import NewCarDetails from '../Screens/NewCarScreens/NewCarDetails'
import OnRoadPrice from '../Screens/NewCarScreens/OnRoadPrice'


const LoginNavigator = createStackNavigator(
  {


    registration: {

      screen: Registration,
      navigationOptions: ({ navigation }) => ({

        headerLeft: null,


        headerTitleStyle: { alignSelf: 'center', justifyContent: "center", textAlign: "center", flex: 1 },
        title: 'Registration',

        headerStyle: {
          backgroundColor: Utilites.BackgroundColor,

        },
        headerTintColor: 'white',


      }),
    },
    walkingview: {

      screen: WalkingView,

    },
    otpVerify: {

      screen: OTPVerify
    },
    termsCondition: {

      screen: TermsAndCondition
    },

  },
  {
    initialRouteName: 'walkingview',
  },
  {
    defaultNavigationOptions: {



    },
  }
);



const DashboardNavigator = createStackNavigator(
  {

    dashBoardView: {

      screen: DashboardView
    },

    // testRegistration: {

    //   screen: TestRegistration
    // },
    drivingSchool: {

      screen: DrivingSchool
    },
    referalRedmption: {

      screen: ReferralRedemption
    },
    finance: {

      screen: Finance
    },
    accessories: {

      screen: Accessories
    },
    insurance: {

      screen: Insurance
    },
    customFlatList: {

      screen: CustomFlatList
    },
    newCarList: {

      screen: NewCarList
    },
    newVariantList: {

      screen: NewVariantList
    },
    newCarDetails: {

      screen: NewCarDetails
    },
    onRoadPrice: {

      screen: OnRoadPrice
    },


    customtabNavigator: {

      screen: CustomTabNavigator,
      navigationOptions: ({ navigation }) => ({
        header: null
      }),

    },

  },
  {
    initialRouteName: 'dashBoardView',
  },
  {
    defaultNavigationOptions: {



    },
  }
);



export {LoginNavigator,DashboardNavigator}


// const AppNavigator = createStackNavigator(
//   {

//     loginStack: {

//       screen: LoginNavigator,


//       navigationOptions: ({ navigation }) => ({
//         header: null
//       }),



//     },
//     dashboardStack: {

//       screen: DashboardNavigator,


//       navigationOptions: ({ navigation }) => ({
//         header: null
//       }),



//     },



//   },
//   {
//     initialRouteName: 'loginStack',


//   },


// )










//const AppContainer = createAppContainer(AppNavigator)


//export default AppContainer;
