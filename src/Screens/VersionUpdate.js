import React, { Component } from 'react'
import { View, StyleSheet, AsyncStorage, Text, Platform, ActivityIndicator, Alert } from 'react-native'
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import getDataItem from '../Storage/getAsyncData'
import DeviceInfo from 'react-native-device-info';
import { CheckVersionUpdate } from '../Redux/action'



let userInfo = null


class VersionUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      loggedIn: false,
      gotResponse: null,
      IsUserLogged:false,
      // response: null,
      // responseServer:null
    };
  }




  GetFcmTokenFromServer() {
    firebase.messaging().getToken()
      .then(fcmToken => {
        if (fcmToken) {


          AsyncStorage.setItem('DeviceToken', fcmToken);

          AsyncStorage.setItem('Version', "1.0");

          AsyncStorage.setItem('AppName', Platform.OS === 'ios' ? "IOSCustomer " : "ANDROIDCustomer");
          this.checkAppVersion()

        } else {
          console.log(` Error FCM Token `)
        }
      });


  }








  GetPermissionFromServer() {
    firebase.messaging().requestPermission()
      .then(() => {
        // User has authorised  
        this.CheckPermissionForNotifion()
        console.log("Request Accepted Enabled")
      })
      .catch(error => {
        console.log("Request Rejected")
      });

  }



  CheckPermissionForNotifion() {

    firebase.messaging().hasPermission()
      .then(enabled => {
        if (enabled) {

          this.GetFcmTokenFromServer()

        }

        else {
          this.GetPermissionFromServer()
          console.log(` Error FCM Token `)
        }

      })

  }



  async checkAppVersion() {

    console.log("Hello World")


   
      
    getDataItem('AppName', (userToken) => {
      console.log('Login User Token : ' + userToken);

      getDataItem('DeviceToken', (uuid) => {
        console.log('Device UUID In Logout Action : ' + uuid);


        getDataItem('Version', (version) => {
          console.log('Version UUID In Logout Action : ' + version);


          userInfo   = [{ "AppName": userToken, "DeviceToken": uuid, "Version": version }]


          console.log(userInfo)

        

          this.props.checkVersion(userInfo)

        });


      });


    });

 



  }


  componentDidMount() {


    this.CheckPermissionForNotifion()

    // this.checkAppVersion()


  }

  


   componentWillReceiveProps(nextProps) {

    console.log("Next Props Called me")


    // if (nextProps.products !== this.props.products) {


      this.setState({ gotResponse: nextProps.loadValue })

      if (this.state.gotResponse != null) {
        if (this.state.gotResponse.length != 0) {
          if (this.state.gotResponse.Status.StatusCode == 2) {
            console.log(this.state.gotResponse.Status.StatusCode)

            AsyncStorage.setItem('DateFormat', this.state.gotResponse.Data.DateFormat);


          // this.props.navigation.navigate('walkingview',{"userInfo":userInfo})

          this.props.navigation.navigate('registration',{"userInfo":userInfo})

          }
          else {

            let response = this.state.gotResponse.Status.StatusMsg
            Alert.alert({ response })

          }

        }

      }
   // }

  }


  render() {


    return <ActivityIndicator style={styles.base} size="large" />

  }
}



function mapStateToProps(state) {
  return {

    loadValue: state.checkVersionResponse,
    loading: state.loading,
    error: state.error,
    products: state.items,

  };
}

function mapDispatchToProps(dispatch) {
  return {

    checkVersion: (item) => dispatch(CheckVersionUpdate(item)),


  };
}



export default connect(mapStateToProps, mapDispatchToProps)(VersionUpdate);



const styles = StyleSheet.create({
  base: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
