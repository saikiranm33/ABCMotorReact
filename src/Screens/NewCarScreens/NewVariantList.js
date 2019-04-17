import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Alert, Picker } from 'react-native';
 import Header from '../../Components/header'

import VariantFlatList from '../../Components/VariantFlatList'

import Constant from '../../Utilites/Constant'

import axios from 'axios'
import getDataItem from '../../Storage/getAsyncData'
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';
import CustomSpinner from '../../Utilites/CustomSpinner'



export default class NewVariantList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      totalServerData:[],
      isLoading:false
    };
    this.updateMyData = this.updateMyData.bind(this);
  }
  //static navigationOptions = { header: null };

  


  updateMyData(item) 
  {
   
   console.log("Called Me" + item.NewCarId)

    this.props.navigation.navigate('newCarDetails',{"SelectedCarID":item.NewCarId,"SelectedCarPrice":item.ExshowroomPrice})
  }


  GetVarientsFromModel = async (item) => {

    //console.log("Banner List Called")



    this.setState({isLoading:true})


    const { navigation } = this.props;

    const modelInfo = navigation.getParam('ModelName', '');
   
    let bodyFormData = {

      "DeviceId": item[0][1][0].DeviceToken,
      "Version": item[0][1][0].Version,
      "CustomerId": item[1],
      "ModelName": modelInfo,


   
    }

    console.log(bodyFormData)

    axios({
      method: 'post',
      url: Constant.ServiceURL + 'GetListOfNewCarsVarients',
      data: bodyFormData,

    })
      .then(function (response) {

        console.log(response);

    

        console.log("GetListOfNewCarsVarients List Response")


        let responseValue = response.data

        this.setState({isLoading:false})

        if (responseValue.Status.StatusCode == 2) 
        {
          console.log("Success")


          this.setState({totalServerData:responseValue.Data})
      
        
        }
        else if (responseValue.Status.StatusCode == 1) 
        {
          if (responseValue.Status.DataCode == -1) 
          {


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

       
      }
      )
      .then(function () {
        this.setState({isLoading:false})

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

  this.GetVarientsFromModel(requiredArr)


  });

});


  }


  componentDidMount()
  {
      this.checkAppVersion()

 
  }


  render() {
    return (
      <View style={styles.container}>


  <CustomSpinner   isLoading = {this.state.isLoading} />




<VariantFlatList myDataList = {this.state.totalServerData}  updateList = {this.updateMyData} />
       


     

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#d4d6d8",
    marginTop:Constant.TopHeaderConstant -80,
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
  imageStyle2: {
    width: 20,
    height: 20,
    margin: 10,
  },
  paragraph: {
    marginLeft: 20,
    flexDirection: "row",
    marginRight: 30,
    marginTop: 10,
  },
});
