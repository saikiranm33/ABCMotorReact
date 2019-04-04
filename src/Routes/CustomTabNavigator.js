import * as React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';


import TermsAndCondition from '../Screens/TermsAndCondition'
import DashboardView from '../Screens/Dashboard'
import OTPVerify from '../Screens/CustomerRegistration/OtpVerify'
import Header from '../Components/header';



//import { Ionicons } from '@expo/vector-icons'; 





 
const CustomTabNavigator = createBottomTabNavigator({

    Home: {
      screen: TermsAndCondition,
    },
     CompletedTask: {
      screen: DashboardView,
       navigationOptions: ({ navigation }) => ({
         header : null
      }),
    },
    Pending: {
      screen: OTPVerify,
       
    },
     
},
  {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor),
      }),
      tabBarOptions: {
        activeTintColor: '#f26c1f',
        inactiveTintColor: 'gray',
      },

 },
    

{

  initialRouteName :"CompletedTask"
},
{
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },

}
);


const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Icon;
  let iconName;
  if (routeName === 'Home') {
   
    iconName = `angle-right${focused ? '' : ''}`;
   
  
  } else if (routeName === 'CompletedTask') {
    iconName = `copyright${focused ? '' : ''}`;
  }
  else if (routeName === 'Pending') {
    iconName = `hand-point-right${focused ? '' : ''}`;
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};





export default CustomTabNavigator;
 
