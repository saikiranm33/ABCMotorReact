import * as React from 'react';

import { createStackNavigator } from 'react-navigation'
import Registration from '../Screens/CustomerRegistration/Registration'
import WalkingView from '../Screens/WalkingView'
import TermsAndCondition from '../Screens/TermsAndCondition'
import DashboardView from '../Screens/Dashboard'
import OTPVerify from '../Screens/CustomerRegistration/OtpVerify'
//import TestRegistration from '../Screens/TestRegistration'
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
//import TestDrive from '../Screens/NewCarScreens/TestDrive'
 import Header from '../Components/header'
 import HeaderBack from '../Components/headerBack'
import Dashboard2 from '../Screens/Dashboard2'


const LoggedInNavigator = createStackNavigator(
    {


      dashBoardView: {
  
        screen: DashboardView,
      
      },

      dashBoardView2: {
  
        screen: Dashboard2,
       
      
      },


      header: {
  
        screen: Header,
      
      },
  
      // testRegistration: {
  
      //   screen: TestRegistration
      // },
      drivingSchool: {
  
        screen: DrivingSchool,
         navigationOptions: ({ navigation }) => ({
         header : <Header title = "Driving School" navigation = {navigation} leftButton = {true}/>
         }),
      },
      referalRedmption: {
  
        screen: ReferralRedemption,
        navigationOptions: ({ navigation }) => ({
          header : <Header title = "Referral Redemption" navigation = {navigation} leftButton = {true} />
          }),
        
      },
      finance: {
  
        screen: Finance,
        navigationOptions: ({ navigation }) => ({
          header : <Header title = "Finance"  leftButton = {true} navigation = {navigation} />
          }),
      },
      accessories: {
  
        screen: Accessories,
        navigationOptions: ({ navigation }) => ({
          header : <Header title = "Accessories"  leftButton = {true} navigation = {navigation} />
          }),
      },
      insurance: {
  
        screen: Insurance,
        navigationOptions: ({ navigation }) => ({
          header : <Header title = "Insurance"  leftButton = {true} navigation = {navigation}/>
          }),
      },
      customFlatList: {
  
        screen: CustomFlatList
      },
      newCarList: {
  
        screen: NewCarList,
        navigationOptions: ({ navigation }) => ({
          header : <Header title = "New Car List"  leftButton = {true} navigation = {navigation}/>
          }),
      },
      newVariantList: {
  
        screen: NewVariantList,
        navigationOptions: ({ navigation }) => ({
        header : <Header title = "Variant List"  leftButton = {true} navigation = {navigation}/>
          }),
      },
      newCarDetails: {
  
        screen: NewCarDetails,
        navigationOptions: ({ navigation }) => ({
          header : <HeaderBack title = "New Car Details"  leftButton = {true} navigation = {navigation}/>
            }),
       
      },
      onRoadPrice: {
  
        screen: OnRoadPrice,
        navigationOptions: ({ navigation }) => ({
          header : <Header title = "On Road Price"  leftButton = {true} navigation = {navigation}/>
            }),
      },

      // testDrive: {
  
      //   screen: TestDrive
      // },
  
    },
    {
      initialRouteName: 'dashBoardView',
    },
    {
      defaultNavigationOptions: {
  

      },
    }
  );
 
export default LoggedInNavigator
