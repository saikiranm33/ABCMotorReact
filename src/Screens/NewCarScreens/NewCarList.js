import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Alert, Picker } from 'react-native';
import Header from '../../Components/header'
import axios from 'axios'
import CustomFlatList from '../../Components/customFlatList'
import Constant from '../../Utilites/Constant'
import getDataItem from '../../Storage/getAsyncData'
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';
import CustomSpinner from '../../Utilites/CustomSpinner'


export default class NewCarList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      totalPage: 0,
      totalServerData: [],
      requiredInfo:[],
      isLoading: false
    };

    this.updateMyData = this.updateMyData.bind(this);

    this.onEndReached = this.onEndReached.bind(this);

  }






  onEndReached() 
  {

    console.log(this.state.totalPage)
    console.log(this.state.pageNumber)


   if (this.state.totalPage != this.state.pageNumber)
   { 

    this.state.pageNumber = this.state.pageNumber + 1

     this.GetCarModelList(this.state.requiredInfo)
         
   }
   else
   {
    Toast.show('Sorry No More Data to Load ...');
   }

    

  }

  updateMyData(item) {

    console.log(item.ModelName)


    this.props.navigation.navigate('newVariantList', { "ModelName": item.ModelName })
  }


  GetCarModelList = async (item) => {

    console.log("GetCarModelList  Called")

    console.log(item[0][0])

    let bodyFormData = 
    {
      "DeviceId": item[0][1][0].DeviceToken,
      "Version": item[0][1][0].Version,
      "CustomerId": item[1],
      "PageNumber": this.state.pageNumber,
    }

    console.log(bodyFormData)

    this.setState({isLoading:true})

    axios({
      method: 'post',
      url: Constant.ServiceURL + 'GetNewCarsByModel',
      data: bodyFormData,

    })
      .then(function (response) {

        console.log(response);

        this.setState({isLoading:false})

        console.log("GetNewCarsByModel List Response")


        let responseValue = response.data



        if (responseValue.Status.StatusCode == 2) 
        {
          console.log("Success")
           let totalRequiredResp = this.state.totalServerData
           
           responseValue.Data.map((item, key) => {
 
              totalRequiredResp.push(item)
             
             })
          
          this.setState({ totalServerData: totalRequiredResp })
          this.setState({ totalPage: responseValue.TotalPages })


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

        this.setState({isLoading:false})


        console.log(error), this.setState({ isLoading: false })
        // Alert.alert(`Something went wrong please try after some time`);

        console.error(error);

        this.setState({ bannerResponse: [] })
      }
      )
      .then(function () {

        this.setState({isLoading:false})

        // always executed
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

        this.setState({ requiredInfo:requiredArr})

        this.GetCarModelList(requiredArr)

      });

    });


  }


  componentDidMount() 
  {

    this.checkAppVersion()

    this.setState({pageNumber:1})

  }



  render() {
    return (
      <View style={styles.container}>

  <CustomSpinner   isLoading = {this.state.isLoading} />

        <View style={{ marginTop: 50, flex: 1 }}>

          <CustomFlatList updateList={this.updateMyData} DataList={this.state.totalServerData} onEndReached={this.onEndReached} />

        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d4d6d8",
    marginTop: Constant.TopHeaderConstant - 100,
    //position:"absolute",

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
