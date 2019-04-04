import React, { Component } from 'react'
import { View, ActivityIndicator, StyleSheet,StatusBar,AsyncStorage } from 'react-native'
import { getRootNavigator } from '../navigator/'
import { isLoggedIn } from '../api/auth'
import ColorUtilites from '../Utilites/utilites';
import {storeDataLocal} from '../Redux/action'

import { connect } from 'react-redux';

 class Root extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;

    this.state = {
      loading: true,
      loggedIn: false,
    };
  }

  async componentDidMount() {

    const loggedIn = await isLoggedIn();
    this.setState({ loggedIn, loading: false });

  
  }



  render() {
    if (this.state.loading) {
      return (
        <View style={styles.base}>
           <StatusBar backgroundColor= {ColorUtilites.BackgroundColor} barStyle="light-content" />
          <ActivityIndicator size='large' />
        </View>
      )
    }
  
    const RootNavigator = getRootNavigator(this.state.loggedIn);
    return <RootNavigator />
  }
}





export default Root;




const styles = StyleSheet.create({
  base: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
