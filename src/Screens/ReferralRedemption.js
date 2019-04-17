import * as React from 'react';
import { Text, View, StyleSheet,TextInput,Image,TouchableOpacity ,ScrollView,Alert} from 'react-native';
import Header from '../Components/header'
import Constant from '../Utilites/Constant'
import Utilites from '../Utilites/utilites'
import getDataItem from '../Storage/getAsyncData'
import axios from 'axios'
import CustomSpinner from '../Utilites/CustomSpinner'







// You can import from local files


// or any pure javascript modules available in npm




export default class ReferralRedemption extends React.Component {
 constructor(props) {
    super(props);
    this.state = { 
      referralTxt: '' ,
      isLoading: false,
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
  


  axios({
    method: 'post',
    url: Constant.ServiceURL + 'RedeemReferelCode',
    data: reuiredInput,
  
  })
    .then(function (response) {
  
      console.log(response);
  
      this.setState({ isLoading: false })
  
      console.log("SaveDrivingRequest Response")
  
  
      let responseValue = response.data
  
      if (responseValue.Status.StatusCode == "2") 
      {
        console.log("Success")
        // Alert.alert("Thanks, Your request has been accepted. You will be contacted shortly.")
  
  
        Alert.alert(
          'Success',
          'Thanks, Your request has been accepted. You will be contacted shortly.',
          [
            { text: 'OK', onPress: () => { this.props.navigation.goBack(null), this.setState({referralTxt:""}) } },
          ]
        )
      }
   

      else if (responseValue.Status.StatusCode == "1") 
      {
        if (responseValue.DataCode == "-1") 
        {
          Alert.alert("Multiple Users Logged Please Register Again")
          console.log("Multiple User Called ")
  
        }
       else if (responseValue.Status.DataCode == "0") 
        {
     
          console.log(responseValue.Status.StatusMsg)

          Alert.alert(
            'Alert',
            responseValue.Status.StatusMsg,
            [
              { text: 'OK', onPress: () => { this.setState({referralTxt:""}) } },
            ]
          )
  
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
  
      this.setState({ isLoading: false })
    });

  }

  ValidateDetailsEntered()
  {

    console.log(this.state.referralTxt)

    console.log(this.state.referralTxt.length)


    if (this.state.referralTxt)
    {
      this.setState({ isLoading: true })
       this.checkAppVersion()

    }
    else
    {
     Alert.alert("Please  Enter the Referral Code")
    }



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
    keyboardType = {"number-pad"}
/>
</View>





   <TouchableOpacity
         style={{height:50,backgroundColor:"#f4bf42",borderRadius:50/2 ,justifyContent:"center",alignSelf:"center",width:240,marginTop:30}}
         onPress={() =>  this.ValidateDetailsEntered()}
       >
         <Text style ={{textStyle:"bold",alignSelf:"center"}}> SUBMIT </Text>
  </TouchableOpacity>


  <CustomSpinner isLoading = {this.state.isLoading}/>


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
