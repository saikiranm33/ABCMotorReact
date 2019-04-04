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
  ImageBackground
} from 'react-native';

import { withCollapsible } from 'react-navigation-collapsible';
import Swiper from 'react-native-swiper';
import Header from '../Components/header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomFlatList from '../Components/customFlatList'
import { createBottomTabNavigator, createAppContainer, createStackNavigator, NavigationActions, StackActions } from 'react-navigation';
import AsyncImageAnimated from 'react-native-async-image-animated'
import ColorUtilites from '../Utilites/utilites';
import { connect } from 'react-redux';
import { GetCity, GetModel, GetBrand, GetBranch, RegisterCustWithNoVehicle } from '../Redux/action'
import getDataItem from '../Storage/getAsyncData'
import Constant from '../Utilites/Constant'



const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const extraHeaderHeight = Dimensions.get('window').height / 2;
const screenWidth = Dimensions.get('window').width;
const BackgroundColor = "#4d2c97"
const BottomLineColor = "#d5d5d5"
const BorderColor = "#ABAAAA"

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


let PhotoListData = []






class DashboardView extends Component {

  constructor(props) {
    super(props);

    const data = [];
    for (let i = 0; i < 15; i++) {
      data.push(i.toString());
    }

    this.state = {
      data: data,
      photoData: null,
    };
  }

  static navigationOptions = {
    header: null
  }

  componentDidMount() {




    console.log("Called Me Dashbaord")


  }






  renderItem = ({ item, index }) => (
    <View style={{ backgroundColor: "white", marginRight: 30, marginLeft: 30 }}>

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
        </Text>


        <View style={{ flex: 1, justifyContent: "flex-end", flexDirection: "row" }}>
          <Image
            style={{ width: 20, height: 20, marginRight: 10, alignSelf: "center" }}
            source={require('../Images/HomeScreen/arrow.png')}
          />
        </View>


      </TouchableOpacity>
    </View>
  );

  render() {
    const { paddingHeight, animatedY, onScroll } = this.props.collapsible;

    return (
      <AnimatedFlatList
        style={{
          flex: 1,
          marginTop: 0,
          // marginLeft: 30,
          backgroundColor: 'white',
          borderColor: '#0002',
          // marginRight: 30,
          backgroundColor: "#efefef"
        }}
        data={myListItemArr}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => String(index)}
        contentContainerStyle={{ paddingTop: extraHeaderHeight + 30 }}
        scrollIndicatorInsets={{ bottom: 100 }}
        onScroll={onScroll}
        _mustAddThis={animatedY}
      />
    );
  }
}







const SearchBarField = ({ navigation, collapsible }) => {






  // eslint-disable-next-line no-unused-vars
  const { translateY, translateOpacity, translateProgress } = collapsible;



  return (
   
      <SwiperClass />

  );
};



class SwiperClass extends React.Component {




  constructor(props) {

    super(props)

    this.state = {

      bannerResponse: [],
      notificationCount:null,

    }

  }

  GetCustomerVehicleList = async(item) => {

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


   //     console.log(responseJson)


        let responseValue = responseJson.Status


        if (responseValue.StatusCode == "2") {

          console.log("get Customer Success")

        


           let responseRequired = this.state.bannerResponse

     
           console.log(responseRequired )



           {responseJson.Data.map((item, key) => {

            responseRequired.push(item)


           })}


           console.log(responseRequired )

          this.setState({bannerResponse:responseRequired})

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


  GetBannerList = async (item) => {

    console.log("Banner List Called")

    console.log(item)

    fetch(Constant.ServiceURL + 'GetBannersList', {
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



        console.log("Banner List Response")


        console.log(responseJson)


        let responseValue = responseJson.Status


        if (responseValue.StatusCode == "2") {

          console.log("Success")

          this.setState({ bannerResponse: responseJson.Data })

          this.setState({notificationCount:responseJson.NotificationCount})

       

         // this.GetCustomerVehicleList(item)

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


    console.log("Called Me")


    this.checkAppVersion()

  }




  render() {

    

    return (




      <View
      style={{
        height: '100%',
        justifyContent: 'center',
        backgroundColor: ColorUtilites.BackgroundColor,
      }}>


      <View style={styles.header}>

        <View style={{ flex: 1 }}></View>



        <View style={{ flex: 1, justifyContent: "flex-end", alignContent: "center", alignItems: "center", alignSelf: "center" }}>
          <Text style={styles.headertext}>DashBoard</Text>
        </View>




        <View style={{ flex: 1, justifyContent: "flex-end", flexDirection: "row", alignContent: "center" }}>
          <ImageBackground source={require('../Images/HomeScreen/notification_icon.png')} style={styles.imageStyle2}>
        <Text style={{marginLeft:20,backgroundColor:"yellow",width:20,height:20,marginTop:-10,fontSize:8,borderRadius:10,alignSelf:"center",padding:2,paddingTop:5}} >  {this.state.notificationCount}  </Text>
          </ImageBackground>
         
        </View>


      </View>


{this.state.bannerResponse !=  []  ? 
   

   <Swiper style={styles.wrapper} showsButtons={false} autoplay={true} dotColor="white" dotColor="white" activeDot={<View style={{ backgroundColor: 'white', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginBottom: -20, }} />} dot={<View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginBottom: -20 }} />}   >
     {this.state.bannerResponse.map((item, key) => {
       
       console.log(item.Path)
       console.log(item.ImagePath)


       return (
         <View style={styles.slide1}>

    


           <AsyncImageAnimated
             source={{
        
               uri:   item.Path
             }}
             placeholderSource={require('../Images/default-car-home.png')}
             style={{ width: screenWidth - 10, height: extraHeaderHeight - 0, alignSelf: "center", resizeMode: "strech",}}
           />

           <Text
             style={{ color: "white", textAlign: "center", fontSize: 10, marginLeft: 10 ,marginRight:10,marginTop:-40}}
           >{item.Description}</Text>


         </View>

       )
     })}

   </Swiper>
:
     <Swiper style={styles.wrapper} showsButtons={false} autoplay={true} dotColor="white"     dotColor="white"      activeDot = {<View style={{backgroundColor: 'white', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginBottom: -20,}} />} dot = {<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3,  marginBottom: -20}} />}   >
     {DataList.map((item, key) => {
       return (
         <View style={styles.slide1}>

     
           <Image
         source = {item.bannerImage}
             placeholderColor={'#cfd8dc'}
             style={{ width:screenWidth - 10 ,height: extraHeaderHeight - 40,alignSelf:"center",resizeMode:"stretch"}}
 
           />
           <Text
             style={{ color: "white", textAlign: "center", margin:10}}
           >{item.bannerText}</Text>


         </View>

       )
     })}

   </Swiper> 

    }
    </View>



   
   
    )



  }


}



function mapStateToProps(state) {
  return {


    getCityList: state.getCity,

  };
}

function mapDispatchToProps(dispatch) {
  return {

    getCity: (item) => dispatch(GetCity(item)),
    getModel: (item) => dispatch(GetModel(item)),
    testingLoading: (item) => dispatch(RegisterCustWithNoVehicle(item)),

  };
}





const collapsibleParams = {
  collapsibleComponent: SearchBarField,
  collapsibleBackgroundStyle: {
    height: extraHeaderHeight + 30,
    backgroundColor: BackgroundColor,

    borderColor: BackgroundColor,
    marginTop: 0,


  },

};

export default connect(mapStateToProps, mapDispatchToProps)(withCollapsible(DashboardView, collapsibleParams));


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: extraHeaderHeight,

    borderRadius: 10,

  },
  slide1: {
    flex: 1,
    marginTop: -50
  },
  header: {
    //  backgroundColor: '#4d2c97',
    flexDirection: 'row',
    height: 60,
    justifyContent: "space-evenly"

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



