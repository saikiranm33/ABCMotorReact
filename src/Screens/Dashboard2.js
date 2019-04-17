
import React, { Component } from 'react';
import {
  Text,
  FlatList,
  View,
  Animated,
  TouchableOpacity,
  AsyncStorage,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
  ImageBackground,
  
} from 'react-native';

import { withCollapsible } from 'react-navigation-collapsible';
import Swiper from 'react-native-swiper';

import AsyncImageAnimated from 'react-native-async-image-animated'
import ColorUtilites from '../Utilites/utilites';
import { connect } from 'react-redux';
import { GetCity, GetModel, GetBrand, GetBranch, RegisterCustWithNoVehicle } from '../Redux/action'
import getDataItem from '../Storage/getAsyncData'
import Constant from '../Utilites/Constant'
import axios from 'axios'
import logout from '../api/auth'
import FastImage from 'react-native-fast-image'
import Spinner from 'react-native-loading-spinner-overlay';
import Carousel from 'react-native-snap-carousel';



const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const extraHeaderHeight = Dimensions.get('window').height / 2 + 50;
const screenWidth = Dimensions.get('window').width;
const BackgroundColor = "#4d2c97"

 


const myListItemArr = [

  { id: 1, listImage: require('../Images/HomeScreen/driving_school.png'), listTitle: "Driving School", path: "drivingSchool" },
  { id: 2, listImage: require('../Images/HomeScreen/referral_reedemption.png'), listTitle: "Referral Redemption", path: "referalRedmption" },
  { id: 2, listImage: require('../Images/HomeScreen/accessories.png'), listTitle: "Accessories", path: "accessories" },
  { id: 3, listImage: require('../Images/HomeScreen/insurance.png'), listTitle: "Insurance", path: "insurance" },
  { id: 4, listImage: require('../Images/HomeScreen/new_cars.png'), listTitle: "New Cars", path: "newCarList" },
  { id: 5, listImage: require('../Images/HomeScreen/finance.png'), listTitle: "Finance", path: "finance" },
  { id: 6, listImage: require('../Images/HomeScreen/used_cars.png'), listTitle: "Used Cars", path: "dashBoardView" },
  { id: 7, listImage: require('../Images/HomeScreen/feedback.png'), listTitle: "Feedback", path: "dashBoardView" },
  { id: 8, listImage: require('../Images/HomeScreen/payments.png'), listTitle: "Payments", path: "dashBoardView" },
  { id: 9, listImage: require('../Images/HomeScreen/price_tag.png'), listTitle: "Sell Used Cars", path: "dashBoardView" },
  { id: 10, listImage: require('../Images/HomeScreen/wallet.png'), listTitle: "Wallet", path: "dashBoardView" },


]

const DataList = [

  { id: 2, bannerImage: require('../Images/banner11.jpg'), bannerText: "Well Maintained Car Available" },
  { id: 2, bannerImage: require('../Images/banner13.jpg'), bannerText: "Well Maintained Car Available" },
  { id: 2, bannerImage: require('../Images/banner1.jpg'), bannerText: "Well Maintained Car Available" },
  { id: 2, bannerImage: require('../Images/banner2.jpg'), bannerText: "Well Maintained Car Available" },
  { id: 2, bannerImage: require('../Images/banner13.jpg'), bannerText: "Well Maintained Car Available" },
  { id: 2, bannerImage: require('../Images/banner7.jpg'), bannerText: "Well Maintained Car Available" },

]


export default class Dashboard2 extends React.Component {



  static navigationOptions = {
    header: null
  }

  constructor(props) {

    super(props)

    this.state = {

      bannerResponse: [],
      notificationCount: null,
      totalStateResponse: [],
      totalScrollState:null

    }

  }
  async onLogOut() {


    console.log("Called Me ")

    await logout();
    this.props.navigation.navigate('LoggedOut');

  }


  GetCustomerVehicleList = async (item) => {

    console.log(" GetCustomerVehicleList   Called")

    fetch(Constant.ServiceURL + 'GetCustomerVehicleLists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        "CustomerId": item.CustomerId,
        "DeviceId": item.DeviceId,
        "Version": item.Version,

      })
    })
      .then((response) => response.json())

      .then((responseJson) => {



        console.log(" GetCustomerVehicleList   Success")


        console.log(responseJson)


        let responseValue = responseJson.Status


        if (responseValue.StatusCode == "2") {

          console.log("get Customer Success")

          this.GetCustomerProfile(item)



          let responseImageRequired = this.state.bannerResponse



          let totalRequiredResp = this.state.totalStateResponse


          {
            responseJson.Data.map((item, key) => {

              responseImageRequired.push(item.ImagePath)
              totalRequiredResp.push(item)

            })
          }



          console.log(totalRequiredResp)

          this.setState({ bannerResponse: responseImageRequired })

          this.setState({ totalStateResponse: totalRequiredResp })


          console.log("Total State Response")
          console.log(this.state.totalStateResponse)

          return responseJson
        }


        else {
          // Alert.alert(`Something went wrong please try after some time`);

          this.setState({ bannerResponse: [] })

        }

      })
      .catch((error) => {
        this.setState({ isLoading: false })
        // Alert.alert(`Something went wrong please try after some time`);

        console.error(error);

        this.setState({ bannerResponse: [] })


      });

  }

  GetCustomerProfile = async (item) => {

    //console.log("Banner List Called")






    let bodyFormData = {

      "CustomerId": item.CustomerId,
      "DeviceId": item.DeviceId,
      "Version": item.Version,

    }

    console.log(bodyFormData)

    axios({
      method: 'post',
      url: Constant.ServiceURL + 'GetCustomerInformation',
      data: bodyFormData,

    })
      .then(function (response) {

        console.log(response);



        console.log("GetCustomerInformation Response")


        let responseValue = response.data



        if (responseValue.Status.StatusCode == 2) {
          console.log("Success")

        }
        else if (responseValue.Status.StatusCode == 1) {
          if (responseValue.Status.DataCode == -1) {


            Alert.alert("Multiple Users Logged Please Register Again")


            console.log("Multiple User Called ")





          }


        }




      }.bind(this))
      .catch(error => {



        console.log(error), this.setState({ isLoading: false })
        // Alert.alert(`Something went wrong please try after some time`);

        console.error(error);


      }
      )
      .then(function () {
        // always executed
      });

  }

  GetBannerList = async (item) => {

    //console.log("Banner List Called")

    this.setState({ bannerResponse: [] })




    let bodyFormData = {

      "CustomerId": item.CustomerId,
      "DeviceId": item.DeviceId,
      "Version": item.Version,

    }

    console.log(bodyFormData)

    axios({
      method: 'post',
      url: Constant.ServiceURL + 'GetBannersList',
      data: bodyFormData,

    })
      .then(function (response) {

        console.log(response);

        if (response.data.Status.StatusCode == 2) {
          AsyncStorage.setItem('UserInformation', bodyFormData);
        }


        console.log("Banner List Response")


        let responseValue = response.data



        if (responseValue.Status.StatusCode == 2) {
          console.log("Success")

          let requiredArray = []

          {
            responseValue.Data.map((item, key) => {

              requiredArray.push(item.Path)


            })
          }


          this.setState({ bannerResponse: requiredArray })


          this.setState({ totalStateResponse: responseValue.Data })

          console.log("Total State Response")
          console.log(this.state.totalStateResponse)

          this.setState({ notificationCount: responseValue.NotificationCount })

          this.GetCustomerVehicleList(bodyFormData)

        }
        else if (responseValue.Status.StatusCode == 1) {
          if (responseValue.Status.DataCode == -1) {


            Alert.alert("Multiple Users Logged Please Register Again")

            Alert.alert(
              'Multiple Users Logged ',
              'Please Register Again',
              [

                { text: 'OK', onPress: () => { this.onLogOut() } },

              ]
            )


            console.log("Multiple User Called ")

          }


        }



      }.bind(this))
      .catch(error => {



        console.log(error), this.setState({ isLoading: false })
        // Alert.alert(`Something went wrong please try after some time`);

        console.error(error);

        this.setState({ bannerResponse: [] })
      }
      )
      .then(function () {
        // always executed
      });

  }

  async checkAppVersion() {

    console.log("Hello World")



    getDataItem('CustomerID', (userToken) => {


      getDataItem('DeviceToken', (uuid) => {



        getDataItem('Version', (version) => {



          userInfo = { "CustomerId": userToken, "DeviceId": uuid, "Version": version }


          console.log(userInfo)


          this.GetBannerList(userInfo)

        });


      });


    });


  }

  componentDidMount() {


  
 


    this.checkAppVersion()

  }


  

  render() {
 
    return (

      <View style={{ flex: 1 }}>

        <Animated.View   style={{ backgroundColor: "black", borderBottomLeftRadius: 80, borderBottomRightRadius: 80, borderBottomWidth: 13 ,height:500 - this.state.totalScrollState}}>



          <View style={styles.header}>

            <View style={{ flex: 1 }}></View>



            <View style={{ flex: 1, justifyContent: "flex-end", alignContent: "center", alignItems: "center", alignSelf: "center" }}>
              <Text style={styles.headertext}>DashBoard</Text>
            </View>


            <View style={{ flex: 1, justifyContent: "flex-end", flexDirection: "row", alignContent: "center" }}>
              <ImageBackground source={require('../Images/HomeScreen/notification_icon.png')} style={styles.imageStyle2}>
                <Text style={{ marginLeft: 20, backgroundColor: "yellow", width: 20, height: 20, marginTop: -10, fontSize: 8, borderRadius: 10, alignSelf: "center", padding: 2, paddingTop: 5 }} >  {this.state.notificationCount}  </Text>
              </ImageBackground>

            </View>


          </View>


          {this.state.totalStateResponse.length != 0 || this.state.totalStateResponse != [] ?

<Swiper style={styles.wrapper} showsButtons={false} autoplay={true} dotColor="white" dotColor="white" activeDot={<View style={{ backgroundColor: 'white', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginBottom: -20, }} />} dot={<View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginBottom: -20 }} />}   >
{this.state.totalStateResponse.map((item, key) => {



  return (
    <View style={styles.slide1}>

      <Spinner
        visible={this.state.isLoading}
        TextInput={"Please Wait"}
        textStyle={styles.spinnerTextStyle}
        animation={"fade"}
        color="gray"
      />

      {item.Description != undefined || "" ?
        <View>

          {/* <AsyncImageAnimated
            source={{
              uri: this.state.bannerResponse[key]

            }}
            placeholderSource={require('../Images/default-car-home.png')}
            style={{ width: screenWidth - 10, height: extraHeaderHeight - 0, alignSelf: "center" }}
            
          /> */}

          <FastImage
            style={{ width: screenWidth - 10, height: extraHeaderHeight - 25, alignSelf: "center",marginTop:-80 }}
            source={{
              uri: this.state.bannerResponse[key]
            }}
            resizeMode={FastImage.resizeMode.contain}
            placeholderColor="red"

          />

          <Text
            style={{ color: "white", textAlign: "center", fontSize: 10, marginLeft: 10, marginRight: 10, marginTop: -40 }}
          >{item.Description} </Text>


        </View>

        : <Text
          style={{ color: "white", textAlign: "center", fontSize: 10, marginLeft: 10, marginRight: 10, marginTop: -40 }}
        >{null} </Text>}


      {item.RegistrationNumber != undefined || "" ?


        <View>

          {/* <Image
            source={{
              uri: this.state.bannerResponse[key]

            }}
            placeholderSource={require('../Images/default-car-home.png')}
            style={{ width: screenWidth - 10, height: extraHeaderHeight - 40, alignSelf: "center" }}
          /> */}

          <FastImage
            style={{ width: screenWidth - 20, height: extraHeaderHeight - 120, alignSelf: "center",  }}
            source={{
              uri: this.state.bannerResponse[key]
            }}
            resizeMode={FastImage.resizeMode.center}
          />



          <View style={{ marginRight: 20, marginTop: -10, }}>

            <Text style={{ color: "white", textAlign: "center", fontSize: 20 ,alignSelf:"center"}}
            >{item.RegistrationNumber} </Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 5 }}>



            <Text style={{ color: "white", textAlign: "center", fontSize: 15, flex: 1 }}
            > Previous Service </Text>


            <Text style={{ color: "white", textAlign: "center", fontSize: 15, flex: 1 }}
            > Next Service </Text>



          </View>


          <View style={{ flexDirection: "row", marginTop: 0 }}>



            <Text style={{ color: "white", textAlign: "center", fontSize: 15, flex: 1 }}
            > {item.LastServiceDate}</Text>


            <Text style={{ color: "white", textAlign: "center", fontSize: 15, flex: 1 }}
            > {item.NextServiceDate} </Text>



          </View>

        </View>



        :
        <Text
          style={{ color: "white", textAlign: "center", fontSize: 10, marginLeft: 10, marginRight: 10, marginTop: -40 }}
        >{null}
        </Text>
      }

    </View>
  )
})}
</Swiper>
:
<Swiper style={styles.wrapper} showsButtons={false} autoplay={true} dotColor="white" dotColor="white" activeDot={<View style={{ backgroundColor: 'white', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginBottom: -20, }} />} dot={<View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginBottom: -20 }} />}   >
{DataList.map((item, key) => {
  return (
    <View style={styles.slide1}>
      <Image
        source={item.bannerImage}
        placeholderColor={'#cfd8dc'}
        style={{ width: screenWidth - 10, height: extraHeaderHeight - 40, alignSelf: "center", resizeMode: "stretch" }}
      />
      <Text
        style={{ color: "white", textAlign: "center", margin: 10 }}
      >{item.bannerText}</Text>
    </View>
  )
})}

</Swiper>

          }



        </Animated.View >

        <View style={{ flex:0.76, backgroundColor: "white" }}>


          <View style={{ marginTop: -70, borderRadius: 10 }}>
            <AnimatedFlatList
              style={{ width: '100%' }}
              keyExtractor={(item, index) => index}
              data={myListItemArr}
              onScroll={event => { 
                this.setState({totalScrollState:event.nativeEvent.contentOffset.y}) 
              }}

              renderItem={({ item, index }) => (

                <View style={{ backgroundColor: "white", marginRight: 20, marginLeft: 20, }}>

                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate(item.path)
                    }}
                    style={{
                      height: 60,

                      paddingHorizontal: 0,
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: index % 2 === 0 ? "white" : "#f7f7f7",
                    }}>

                    <Image
                      style={{ width: 30, height: 30, marginLeft: 20 }}
                      source={item.listImage}
                    />

                    <Text style={{ fontSize: 18, color: '#685e7c', paddingLeft: 10 }}>
                      {item.listTitle}
                      {/* {this.state.totalScrollState} */}
                    </Text>


                    <View style={{ flex: 1, justifyContent: "flex-end", flexDirection: "row" }}>
                      <Image
                        style={{ width: 20, height: 20, marginRight: 10, alignSelf: "center" }}
                        source={require('../Images/HomeScreen/arrow.png')}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    )
  }

}
const styles = StyleSheet.create({
  wrapper: {
   // flex: 1,
   marginTop:20
  },
  slide1: {
    flex: 1,
    marginTop:0
  },
  header: {
    //  backgroundColor: '#4d2c97',
    flexDirection: 'row',
    height: 60,
    justifyContent: "space-evenly",


  },

  headertext: {
    fontSize: 18,
    color: 'white',
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "left",
  },

  imageStyle1: {

    width: 20,
    height: 20,
    marginLeft: 10,
  },

  imageStyle2: {

    width: 25,
    height: 25,
    marginRight: 25,
    alignSelf: "center",
  }

});