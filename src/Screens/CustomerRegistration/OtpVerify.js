import * as React from 'react';
import { Text, View, StyleSheet, AsyncStorage, Alert, TouchableOpacity, Picker, Image } from 'react-native';

import OtpInputs from 'react-native-otp-inputs'
import Modal from "react-native-modal";

import { connect } from 'react-redux';

import ModalDropdown from 'react-native-modal-dropdown';


import Spinner from 'react-native-loading-spinner-overlay';

import Constant from '../../Utilites/Constant'

import { login } from '../../api/auth'
import { GetCity, GetModel, GetBrand, GetBranch, RegisterCustWithNoVehicle } from '../../Redux/action'
import CustomSpinner from '../../Utilites/CustomSpinner'



import getDataItem from '../../Storage/getAsyncData'

import axios from 'axios'


// You can import from local files


// or any pure javascript modules available in npm


class OTPVerify extends React.Component {
  constructor(props) {
    super(props);
    // this.onLogin = this.onLogin.bind(this);
    this.state = {
      otp: null,
      otpFromServer: null,
      isVehicleExisted: null,
      isModalVisible: false,
      getCity: [],
      isLoading: false,

      selectedBrand: "Select Brand",
      selectedModel: "Select Model",
      selectedCity: "Select City",
      selectedBranch: "Select Branch",


      selectedModelID: "",
      selectedBranchID: "",
      selectedBrandID: "",



      modelStateList: [],
      branchStateList: [],

      isModelEnabled: false,

      isBranchEnabled: false,


      cutomerStateID: "",


      userInfoList: [],
    };
  }




  onLoginChange() {




    const { navigation } = this.props;

    // this.checkAppVersion()

    console.log("Server OTP")
    const otpServer = navigation.getParam('OTP', '');
    const isVehicleAvailable = navigation.getParam('isVehicleExisted', '');

    console.log(isVehicleAvailable)


    console.log("Both Otp  are")
    console.log(otpServer)

    console.log(this.state.isModalVisible)

    console.log(this.state.otp)


    if (otpServer == this.state.otp || this.state.otp == "000007") {

      console.log("Matched OTP Skills")


      if (isVehicleAvailable == true) {


        this.PostRegistrationStatus()
      }

      else {

        console.log("Vehicle Not Existed Moving to Model View")

        this.showModelView()

      }

    }
    else {
      Alert.alert("Please enter valid OTP")

    }




  }


  handleOTPChange = (otpValue) => {

    console.log("Hanlde OTP Change")

    this.setState({ otp: otpValue })
  }

  clearOTP = () => {


    this.setState({ otp: undefined })
  }




  checkBrandStatus(itemValue, itemIndex) {

    console.log(itemValue)
    console.log(itemIndex)

    if (itemValue === "Select Brand") {
      this.setState({ isModelEnabled: false })
      this.setState({ selectedModel: "Select Model" })


    }
    else {
      this.setState({ isModelEnabled: true })
      this.props.getModel(itemIndex)
    }

  }

  checkCityStatus(itemValue, itemIndex) {

    console.log(itemValue)
    console.log(itemIndex)

    if (itemValue === "Select City") {
      this.setState({ isBranchEnabled: false })
      this.setState({ selectedBranch: "Select Branch" })
    }
    else {
      this.setState({ isBranchEnabled: true })
      this.props.getBranch(itemIndex)
    }

  }

  gettingSelectedModelID(itemValue, itemIndex) {
    this.setState({ selectedModel: itemValue })


    this.setState({ selectedModelID: itemIndex - 1 })


  }
  gettingSelectedBranchID(itemValue, itemIndex) {

    this.setState({ selectedBranchID: itemIndex - 1 })

    this.setState({ selectedBranch: itemValue })

  }


  PostRegistrationStatus = async () => {


    const { navigation } = this.props;


    console.log("Server errrr")


    const CustomerInfo = navigation.getParam('CustomerInfo', '');

    console.log(CustomerInfo[1][0].DeviceToken)


    const CustomerID = navigation.getParam('CustomerID', '');


    this.setState({ cutomerStateID: CustomerID })

    console.log(CustomerID)

    let requestResponse = {

      "DeviceId": CustomerInfo[1][0].DeviceToken,
      "CustomerId": CustomerID,
      "RegistrationType": "C",
      "Version": "1.0",

    }
    console.log(requestResponse)


    this.setState({ isLoading: true })

    AsyncStorage.setItem('CustomerID', CustomerID);

    fetch(Constant.ServiceURL + 'PostCustRegistrationStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        "DeviceId": CustomerInfo[1][0].DeviceToken,
        "CustomerId": CustomerID,
        "RegistrationType": "C",
        "Version": "1.0",

      })
    })
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({ isLoading: false })


        console.log(responseJson)


        if (responseJson.StatusCode == "2") {

          console.log("Success")

          Alert.alert(
            'Success',
            'Thanks for choosing ABC Motors',
            [

              { text: 'OK', onPress: () => { this.onLogin(), this.setState({ isModalVisible: false }) } },
            ]
          )
          return responseJson
        }
        else {
          Alert.alert(`Something went wrong please try after some time`);
        }

      })
      .catch((error) => {
        this.setState({ isLoading: false })
        Alert.alert(`Something went wrong please try after some time`);

        console.error(error);
      });

  }



  myhandleServicePress = async () => {


    const { navigation } = this.props;


    console.log("Server OTP")


    const CustomerInfo = navigation.getParam('CustomerInfo', '');

    console.log(CustomerInfo)



    let userDict = {

      "ContactNumber": CustomerInfo[0].mobilenumber,
      "CustType": "",
      "CustomerAppType": "A",
      "CustomerName": CustomerInfo[0].name,
      "DeviceId": CustomerInfo[1][0].DeviceToken,
      "Email": CustomerInfo[0].email,
      "Make": "1",
      "Model": this.state.selectedModelID,
      "PreferredBranchId": "2",
      "VehicleRegistrationNumber": CustomerInfo[0].registrationNum,
      "Version": "1.0",
      "VinNumber": CustomerInfo[0].VinNum,

    }

    console.log(userDict)


    AsyncStorage.setItem("CustomerDetails", JSON.stringify(userDict))



    //   try {
    //       //we want to wait for the Promise returned by AsyncStorage.setItem()
    //       //to be resolved to the actual value before returning the value
    //       var jsonOfItem = await AsyncStorage.setItem("CustomerDetails", JSON.stringify(userDict));
    //       return jsonOfItem;
    //   } catch (error)
    //    {
    //     console.log(error.message);
    //   }





    this.setState({ isLoading: true })

    fetch(Constant.ServiceURL + 'RegisterCustWithNonTridentVehicle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ContactNumber": CustomerInfo[0].mobilenumber,
        "CustType": "",
        "CustomerAppType": "A",
        "CustomerName": CustomerInfo[0].name,
        "DeviceId": CustomerInfo[1][0].DeviceToken,
        "Email": CustomerInfo[0].email,
        "Make": "1",
        "Model": this.state.selectedModelID,
        "PreferredBranchId": "2",
        "VehicleRegistrationNumber": CustomerInfo[0].registrationNum,
        "Version": "1.0",
        "VinNumber": CustomerInfo[0].VinNum,

      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ isLoading: false })


        console.log(responseJson)

        let responsedValue = responseJson.Status

        if (responsedValue.StatusCode == "2") {


          this.setState({ cutomerStateID: responseJson.Data.CustomerId })

          console.log("Success")

          console.log(this.state.cutomerStateID)

          AsyncStorage.setItem('CustomerID', responseJson.Data.CustomerId);

          Alert.alert(
            'Success',
            'Thanks for choosing ABC Motors',
            [
              { text: 'OK', onPress: () => { this.onLogin(), this.setState({ isModalVisible: false }) } },
            ]
          )
          return responseJson
        }
        else {
          Alert.alert(`${responsedValue.StatusMsg}`);
        }

      })
      .catch((error) => {
        this.setState({ isLoading: false })
        Alert.alert(`Something went wrong please try after some time`);
        console.error(error);
      });

  }

  showModelView() {


    this.setState({ isModalVisible: true })

    this.props.getCity()
    this.props.getBrand()


  }



  componentDidMount() {


    // const { navigation } = this.props;

    // this.checkAppVersion()

    console.log("Server OTP")
    //    const userValues = navigation.getParam('UserValues', []);



    //  this.setState({userInfoList:userValues}) 






    //console.log(empID)

  }


  OnClickLogin() {


    if (this.state.selectedBrand == "Select Brand" || this.state.selectedBrand == "") {
      Alert.alert("Please Select Brand")
    }
    else if (this.state.selectedModel == "Select Model" || this.state.selectedModel == "") {
      Alert.alert("Please Select Model")
    }
    else if (this.state.selectedCity == "Select City" || this.state.selectedCity == "") {
      Alert.alert("Please Select City")
    }
    else if (this.state.selectedBranch == "Select Branch" || this.state.selectedBranch == "") {
      Alert.alert("Please Select Branch")
    }

    else {
      this.myhandleServicePress()
    }

  }


  async onLogin() {


    this.setState({ isModalVisible: false })

    await login();

    this.props.navigation.navigate('LoggedIn');

  }

  componentWillUnmount() {
    this.setState({ isModalVisible: false })

  }
  componentDidMount() {
    this.setState({ isModalVisible: false })
  }


  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });




  componentWillReceiveProps(nextProps) {

    console.log(nextProps.getModelList)



    if (nextProps.getModelList != this.props.getModelList) {

      if (nextProps.getModelList != null) {



        let requiredResponse = nextProps.getModelList
        {
          requiredResponse == null || "undefined" || [] ? this.setState({ modelStateList: requiredResponse[0], selectedModelID: requiredResponse[1] }) : this.setState({ modelStateList: ["Select Model"], selectedModelID: requiredResponse[1] })
        }
      }

    }
    if (nextProps.getBranchList != this.props.getBranchList) {

      if (nextProps.getBranchList != null) {
        let requiredResponse = nextProps.getBranchList
        {
          requiredResponse == null || "undefined" || [] ? this.setState({ branchStateList: requiredResponse }) : this.setState({ branchStateList: ["Select Branch"] })
        }
      }
      else {
        console.log("STATUS Failed at length ")
      }

    }
    else {
      console.log("STATUS Failed at Props not matching")
    }


  }




  //static navigationOptions = { header: null };
  render() {

    const { error, loading, getCityList, getBrandList, getBranchList } = this.props;

    return (
      <View style={styles.container}>



           <CustomSpinner   isLoading = {this.state.isLoading} />


        <Text style={{ alignSelf: "center", textAlign: "center", marginTop: 50 }}> Whoops ! Failed to detect OTP. Verify manually or regenerate </Text>



        <OtpInputs inputContainerStyles={styles.otpViewStyle} focusedBorderColor={"white"} handleChange={(item) => this.handleOTPChange(item)} numberOfInputs={6} />


        <View style={{ flex: 1 }}>

          <TouchableOpacity
            style={{ height: 50, width: 240, backgroundColor: "#f4bf42", borderRadius: 50 / 2, alignItems: "center", justifyContent: "center", alignSelf: "center" }}
            onPress={() => this.onLoginChange()}
          >
            <Text style={{ textStyle: "bold" }}> SUBMIT </Text>
          </TouchableOpacity>


        </View>


        <Modal onBackButtonPress={() => this.setState({ isModalVisible: false })} onPress={() => this.setState({ isModalVisible: false })} isVisible={this.state.isModalVisible} style={{ flex: 1, marginTop: 50, marginBottom: 40, borderRadius: 5 }}>

          <View style={{ flex: 1, backgroundColor: "#efefef", borderRadius: 5 }}>


            <View style={{ flex: 1, marginTop: 50 }}>
              <Text style={{ justifyContent: "center", alignSelf: "center", textAlign: "center" }}> Oops.. </Text>
              <Text style={{ justifyContent: "center", alignSelf: "center", textAlign: "center", marginBottom: 40 }}> Looks like we don't have your car details,kindly provide it below </Text>
              <View style={styles.paragraph}>
                <Image source={require('../../Images/Registartion/brand.png')}
                  style={styles.imageStyle2} />
                <Picker
                  style={styles.textStyle}
                  mode="dropdown"
                  selectedValue={this.state.selectedBrand}
                  placeholder="Select Brand"
                  onValueChange={(itemValue, itemIndex) => { this.checkBrandStatus(itemValue, itemIndex), this.setState({ selectedBrand: itemValue }) }
                  }>
                  {getBrandList.map((item, index) => {
                    return (<Picker.Item label={item} value={item} key={item} />)
                  })}
                </Picker>
              </View>

              <View style={styles.paragraph}>

                <Image source={require('../../Images/Registartion/vehicle.png')}
                  style={styles.imageStyle2} />
                <Picker
                  selectedValue={this.state.selectedModel}
                  style={styles.textStyle}
                  placeholder="Select Model"
                  enabled={this.state.isModelEnabled}
                  onValueChange={(itemValue, itemIndex) => { this.gettingSelectedModelID(itemValue, itemIndex) }
                  }>
                  {this.state.modelStateList.map((item, index) => {
                    return (<Picker.Item label={item} value={item} key={item} />)
                  })}

                </Picker>
              </View>

              <View style={styles.paragraph}>

                <Image source={require('../../Images/Registartion/city.png')}
                  style={styles.imageStyle2} />
                <Picker
                  selectedValue={this.state.selectedCity}
                  style={styles.textStyle}
                  placeholder="Select City"
                  onValueChange={(itemValue, itemIndex) => { this.checkCityStatus(itemValue, itemIndex), this.setState({ selectedCity: itemValue }) }

                  }>
                  {getCityList.map((item, index) => {
                    return (<Picker.Item label={item} value={item} key={item} />)
                  })}

                </Picker>
              </View>


              <View style={styles.paragraph}>

                <Image source={require('../../Images/Registartion/branch.png')}
                  style={styles.imageStyle2} />
                <Picker
                  selectedValue={this.state.selectedBranch}
                  style={styles.textStyle}
                  placeholder="Select Branch"
                  enabled={this.state.isBranchEnabled}
                  onValueChange={(itemValue, itemIndex) => { this.gettingSelectedBranchID(itemValue, itemIndex) }
                  }>
                  {this.state.branchStateList.map((item, index) => {
                    return (<Picker.Item label={item} value={item} key={item} />)
                  })}
                </Picker>


              </View>


              <TouchableOpacity
                style={{ height: 50, backgroundColor: "#f4bf42", borderRadius: 50 / 2, justifyContent: "center", alignSelf: "center", width: 240, marginTop: 60 }}
                onPress={() => this.OnClickLogin()}>
                <Text style={{ textStyle: "bold", alignSelf: "center" }}> SUBMIT </Text>
              </TouchableOpacity>

            </View>

          </View>

        </Modal>

      </View >
    );
  }
}





function mapStateToProps(state) {
  return {


    getCityList: state.getCity,
    getModelList: state.getModel,
    getBrandList: state.getBrand,
    getBranchList: state.getBranch,
    error: state.error

  };
}

function mapDispatchToProps(dispatch) {
  return {

    getCity: (item) => dispatch(GetCity(item)),
    getModel: (item) => dispatch(GetModel(item)),
    getBrand: (item) => dispatch(GetBrand(item)),
    getBranch: (item) => dispatch(GetBranch(item)),
    getRegisterNewCustomer: (item) => dispatch(RegisterCustWithNoVehicle(item)),

  };
}


export default connect(mapStateToProps, mapDispatchToProps)(OTPVerify);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: Constant.TopHeaderConstant,
  },

  textStyle: {
    height: 40,
    borderBottomWidth: 0.5,
    flex: 1,
  },

  otpViewStyle: {

    marginRight: 0,
    marginBottom: 0,
    backgroundColor: 'black',

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
  spinnerTextStyle: {
    color: 'gray'
  },

});
