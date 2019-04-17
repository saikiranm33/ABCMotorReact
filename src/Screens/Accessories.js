import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Alert, Picker } from 'react-native';
import Header from '../Components/header'
import ModalDropdown from 'react-native-modal-dropdown';
import Constant from '../Utilites/Constant'
import { connect } from 'react-redux';
import { GetModel, GetBrand } from '../Redux/action'
import CustomSpinner from '../Utilites/CustomSpinner';
import axios from 'axios'
import getDataItem from '../Storage/getAsyncData'




// You can import from local files


// or any pure javascript modules available in npm


const DataList = [1,2,4,5,6,7,8,9,9,1,2,3,4,5,6]

 class Accessories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brandTxt: '',
      modelTxt: '',
      partTxt: '',
      language: "",

      isVehicleExisted: null,
      isModalVisible: false,
    
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


    };
  }
 

  


  checkBrandStatus(itemValue, itemIndex) {

    console.log(itemValue)
    console.log(itemIndex)

    if (itemValue === "Select Brand") {

      this.setState({ isModelEnabled: false })
      this.setState({ selectedModel: "Select Model" })
console.log("Called me 1")

    }
    else {
      this.setState({ isModelEnabled: true })
      this.props.getModel(itemIndex)

      console.log("Called me ")
    }

    this.setState({ selectedBrandID: itemIndex })

  }


  gettingSelectedModelID(itemValue, itemIndex) {


    if (itemValue === "" || itemValue != "Select Model") {
     

      this.setState({ selectedModel: itemValue })

      this.setState({ selectedModelID: itemIndex - 1 })

    }
    else
    {
      this.setState({ selectedModel: "Select Model" })

    }



  }

  gettingSelectedBranchID(itemValue, itemIndex) {

    this.setState({ selectedBranchID: itemIndex - 1 })

    this.setState({ selectedBranch: itemValue })

  }



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
  


  }


  componentDidMount()
  {

    this.setState({ isModelEnabled: false })
    this.props.getBrand()

    this.checkBrandStatus()

  }

  async checkAppVersion() {

    console.log("Hello World")
  
    let requiredArr = []
  
    getDataItem('CustomerID', (CustomerID) => {
  
    getDataItem('CustomerDetails', (userToken) => {
  
  
   requiredArr.push(JSON.parse(userToken))
   requiredArr.push(CustomerID)
  
      console.log(requiredArr)
  
    this.handleServerResponse(requiredArr)
  
  
    });
  
  });
  
  
    }


    async onLogin() {


      this.setState({ isModalVisible: false })
  
      await login();
  
      this.props.navigation.navigate('LoggedIn');
  
    }

  handleServerResponse = async(item) =>{


    this.setState({ isLoading: true })


    let reuiredInput =
    {
  
      "Name": item[0].CustomerName, 
      "DeviceId": item[0].DeviceId, 
      "Version": item[0].Version,
      "Email": item[0].Email,
      "ContactNumber": item[0].ContactNumber,
      "CustomerId": item[1] ,
      "Make": this.state.selectedBrandID ,
      "Model": this.state.selectedModelID ,
      "AccessoryName": this.state.partTxt,
    }
  

    console.log(reuiredInput)

    axios({
      method: 'post',
      url: Constant.ServiceURL + 'AccessoryRequest',
      data: reuiredInput,

    })
      .then(function (response) {

        console.log(response);

        this.setState({ isLoading: false })

        console.log("AccessoryRequest Response")


        let responseValue = response.data

        if (responseValue.StatusCode == 2) 
        {
          console.log("Success")
          // Alert.alert("Thanks, Your request has been accepted. You will be contacted shortly.")


          Alert.alert(
            'Success',
            'Thanks, Your request has been accepted. You will be contacted shortly.',
            [
              { text: 'OK', onPress: () => { this.props.navigation.goBack(null) } },
            ]
          )
        }


        else if (responseValue.StatusCode == 1) 
        {
          if (responseValue.DataCode == -1) 
          {
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

        this.setState({ isLoading: false })
      });

  }


  ValidateDetailsEntered()
  {

    if (this.state.selectedBrand == "Select Brand" || this.state.selectedBrand == "") {
      Alert.alert("Please Select Brand")
    }
    else if (this.state.selectedModel == "Select Model" || this.state.selectedModel == "") {
      Alert.alert("Please Select Model")
    }
    else if (this.state.partTxt == "Select Part" || this.state.partTxt == "") {
      Alert.alert("Please Enter Part Name")
    }
    else 
    {
      this.checkAppVersion()
    }

  }

  
  render() {


    const { error, loading, getBrandList, getBranchList } = this.props;
    return (

    

      <ScrollView style={styles.container}>


        <Image source={require('../Images/Accessories/accessoriesQuote.png')} style={{ width: 250, height: 250, alignSelf: "center" }} />

                   <View style={styles.paragraph}>
                <Image source={require('../Images/Registartion/brand.png')}
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

                <Image source={require('../Images/Registartion/vehicle.png')}
                  style={styles.imageStyle2} />
                <Picker
                  selectedValue={this.state.selectedModel}
                  style={styles.textStyle}
                  placeholder="Select Model"
                  enabled={this.state.isModelEnabled}
                  onValueChange={(itemValue, itemIndex) => { this.gettingSelectedModelID(itemValue, itemIndex) }
                  }>
                  {this.state.modelStateList.map((item, index) => {

                    if(item)
                    {
                      return (<Picker.Item label={item} value={item} key={item} />)

                    }
                    else
                    {
                      return null
                    }

                    
                  })}

                </Picker>
              </View>



        <View style={styles.paragraph}>

  <Image source={require('../Images/Registartion/vehicle.png')}            style={styles.imageStyle2} />
          <TextInput
            value={this.state.partTxt}
            placeholder="Enter Part Name"
            style={styles.textStyle}
            maxLength={10}
            onChangeText = {(text)  => this.setState({partTxt:text})}/> 


        </View>




        <TouchableOpacity
          style={{ height: 50, width: 240, backgroundColor: "#f4bf42", borderRadius: 50 / 2, justifyContent: "center", alignItems: "center", alignSelf: "center", marginTop: 20,marginBottom:10 }}
          onPress={() => this.ValidateDetailsEntered()}>
          <Text style={{ textStyle: "bold" }}> GET QUOTE </Text>
        </TouchableOpacity>

      <CustomSpinner  isLoading = {this.state.isLoading}  />


      </ScrollView>
    );
  }
}



function mapStateToProps(state) {
  return {

    getModelList: state.getModel,
    getBrandList: state.getBrand,
    error: state.error

  };
}

function mapDispatchToProps(dispatch) {
  return {

  
    getModel: (item) => dispatch(GetModel(item)),
    getBrand: (item) => dispatch(GetBrand(item)),
  
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Accessories);


const styles = StyleSheet.create({
  container: {
    flex: 1,
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