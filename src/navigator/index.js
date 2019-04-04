import { createSwitchNavigator,createAppContainer } from 'react-navigation'
import * as React from 'react';

import LoggedOutNavigator from './LoggedOut'
import LoggedInNavigator from './LoggedIn'
import InitialRouteNavigator from './InitialView'



export const getRootNavigator = (loggedIn = false) => createAppContainer(createSwitchNavigator(
  {

  
    LoggedOut: {
      screen: LoggedOutNavigator
    },
    LoggedIn: {
      screen: LoggedInNavigator
    }
  },
  {
     initialRouteName: loggedIn ? 'LoggedIn' : 'LoggedOut'

  }
));