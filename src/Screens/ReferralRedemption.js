import * as React from 'react';
import { Text, View, StyleSheet,TextInput,Image,TouchableOpacity ,ScrollView,Alert} from 'react-native';
import Header from '../Components/header'
import Constant from '../Utilites/Constant'
import Utilites from '../Utilites/utilites'
import getDataItem from '../Storage/getAsyncData'
import axios from 'axios'

// You can import from local files


// or any pure javascript modules available in npm




export default class ReferralRedemption extends React.Component {
 constructor(props) {
    super(props);
    this.state = { 
      referralTxt: '' ,
  
      };
  }









  GetReferralRedemption = async (item) => {

    console.log("GetReferralRedemption  Called")

    


    let reuiredInput = {
  
  
      "DeviceId": item[0].DeviceId, 
      "Version": item[0].Version,
      "CustomerId": item[1],
      "ReferrelCode":this.state.referralTxt,

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
  
     
  
  
        console.log(responseJson)
  
  
        let responseValue = responseJson.StatusCode
  
  
        if (responseValue == "2") {
  
          console.log("Success")
  
         
  
          Alert.alert(`Our representative will get back to you shortly `);
  
       
  
         // this.GetCustomerVehicleList(item)
  
          return responseJson
        }
  
  
        else 
        {
         Alert.alert(`Something went wrong please try after some time`);
  
         this.setState({ isLoading: false })
  
        }
  
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
  
    this.GetReferralRedemption(requiredArr)
  
  
    });
  
  });

}



  
  render() {
    return (
<View style = {styles.container}>





<Image source = {require('../Images/ReferralRedemption/referral_redemption.png')}  style = {{width:150,height:150,alignSelf:"center",marginTop:20}} />


<Text style = {{alignSelf:"center",textAlign:"center",padding:20}}>  Submit your referral code & get your loyalty </Text>

  <View style={styles.paragraph}>

<Image source={require('../Images/ReferralRedemption/referralIcon.png')}
    style={styles.imageStyle} />
<TextInput
    value={this.state.referralTxt}
    onChangeText={(text) => this.setState({referralTxt:text})}
    placeholder="Enter Referral Code"
    style={styles.textStyle}
    maxLength={10}
/>
</View>





   <TouchableOpacity
         style={{height:50,backgroundColor:"#f4bf42",borderRadius:50/2 ,justifyContent:"center",alignSelf:"center",width:240,marginTop:30}}
         onPress={() =>  this.GetReferralRedemption()}
       >
         <Text style ={{textStyle:"bold",alignSelf:"center"}}> SUBMIT </Text>
  </TouchableOpacity>





      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:Constant.TopHeaderConstant + 50,
   
  
  },

  textStyle :{
    height: 40, 
    borderBottomWidth: 0.5,
    flex:1,
    borderColor:Utilites.BottomLineColorForFiled,
    },

    imageStyle:{
      width: 20, 
      height: 20,
      margin:15,
      },

  paragraph: {
    marginLeft: 20,
    flexDirection:"row",
    marginRight:30,
   
  },


});
