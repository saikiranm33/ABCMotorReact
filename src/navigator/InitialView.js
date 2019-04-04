import * as React from 'react';

import { createStackNavigator } from 'react-navigation'

import VersionUpdate from '../Screens/VersionUpdate'



const InitialRouteNavigator = createStackNavigator(
    {
     
  
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



export default InitialRouteNavigator
