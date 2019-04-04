import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import Header from '../Components/header'
import Constant from '../Utilites/Constant'
import getDataItem from '../Storage/getAsyncData'
import { login ,logout} from '../api/auth'


// You can import from local files


// or any pure javascript modules available in npm




export default class DrivingSchool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false
    };
  }

 // static navigationOptions = { header: null };

 async onLogOut() 
 {
  await logout();
  this.props.navigation.navigate('LoggedOut');

}






 

 GetDrivingSchool = async (item) => {

  console.log("Banner List Called")

  console.log(item)

  this.setState({ isLoading: true })


  let reuiredInput = {


    "CustomerName": item[0].CustomerName, 
    "DeviceId": item[0].DeviceId, 
    "Version": item[0].Version,
    "EmailId": item[0].Email,
    "MobileNumber": item[0].ContactNumber,
    "customerID": item[1],
   

  }

console.log(reuiredInput)


  fetch(Constant.ServiceURL + 'SaveDrivingRequest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

      reuiredInput
      
    })
  })
    .then((response) => response.json())

    .then((responseJson) => {

      this.setState({ isLoading: false })

      console.log("Driving School Response")


      console.log(responseJson)


      // let responseValue = responseJson.Status


      // if (responseValue.StatusCode == "2") {

      //   console.log("Success")

       

      //   Alert.alert(`Our representative will get back to you shortly `);

     

      //  // this.GetCustomerVehicleList(item)

      //   return responseJson
      // }


      // else {
      //  Alert.alert(`Something went wrong please try after some time`);

      //  this.setState({ isLoading: false })

      // }

    })
    .catch((error) => {
      this.setState({ isLoading: false })
      Alert.alert(`Something went wrong please try after some time`);

      console.error(error);

    });

}

 async checkAppVersion() {

  console.log("Hello World")

  let requiredArr = []

  getDataItem('CustomerID', (CustomerID) => {

  getDataItem('CustomerDetails', (userToken) => {


 requiredArr.push(JSON.parse(userToken))
 requiredArr.push(CustomerID)

    console.log(requiredArr)

  this.GetDrivingSchool(requiredArr)


  });

});


  }




  render() {
    return (
      
      
      <View style={styles.container}>


  
        <Image source={require('../Images/DrivingSchool/driving_school.png')} style={{ width: 250, height: 250, alignSelf: "center" }} />

        <Text style={{ alignSelf: "center", textAlign: "center" }}>  Get World-Class driving training at Maruthi Driving School  </Text>

        <TouchableOpacity
          style={{ height: 50, backgroundColor: "#f4bf42", borderRadius: 50 / 2, justifyContent: "center", alignSelf: "center", width: 240, marginTop: 50 }}
          onPress={() =>  this.onLogOut() }>
          <Text style={{ textStyle: "bold", alignSelf: "center" }}> BOOK AN APPOINTMENT </Text>
        </TouchableOpacity>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    marginTop:Constant.TopHeaderConstant,
    
  },

  textStyle: {
    height: 40,

    borderBottomWidth: 0.5,
    flex: 1,
  },

  imageStyle: {
    width: 20,
    height: 20,
    margin: 15,
  },

  paragraph: {
    marginLeft: 20,
    flexDirection: "row",
    marginRight: 30,
    marginTop: 20,
  },

  OvalShapeView: {
    borderBottomLeftRadius: 80 * 2,
    borderBottomRightRadius: 80 * 2,
    backgroundColor: "red",
    height: 200,

  },
});
