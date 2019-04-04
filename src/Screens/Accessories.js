import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Alert, Picker } from 'react-native';
import Header from '../Components/header'
import ModalDropdown from 'react-native-modal-dropdown';
import Constant from '../Utilites/Constant'

import SearchableDropdown from 'react-native-searchable-dropdown';

// You can import from local files


// or any pure javascript modules available in npm


const DataList = [1,2,4,5,6,7,8,9,9,1,2,3,4,5,6]

export default class Finance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brandTxt: '',
      modelTxt: '',
      partTxt: '',
      language: "",

    };
  }
 

  items = [
    {
      id: 1,
      name: 'JavaScript',
    },
    {
      id: 2,
      name: 'Java',
    },
    {
      id: 3,
      name: 'Ruby',
    },

  ];




  render() {
    return (
      <ScrollView style={styles.container}>


        <Image source={require('../Images/Accessories/accessoriesQuote.png')} style={{ width: 250, height: 250, alignSelf: "center" }} />

        <View style={styles.paragraph}>

          <Image source={require('../Images/Registartion/brand.png')}
            style={styles.imageStyle2} />
          <Picker
            selectedValue={this.state.brandTxt}
            style={styles.textStyle}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ brandTxt: itemValue })
            }>
            <Picker.Item label="Select Brand" value="Select" />
            <Picker.Item label="Maruti" value="swift" />
            <Picker.Item label="Hyundai" value="Dzire" />
          </Picker>
        </View>

        <View style={styles.paragraph}>

          <Image source={require('../Images/Registartion/vehicle.png')}
            style={styles.imageStyle2} />
          <Picker
            selectedValue={this.state.modelTxt}
            style={styles.textStyle}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ modelTxt: itemValue })
            }>
            <Picker.Item label="Select Model" value="Select" />
            <Picker.Item label="Swift" value="swift" />
            <Picker.Item label="Dzire" value="Dzire" />
          </Picker>
        </View>



        <View style={styles.paragraph}>

  <Image source={require('../Images/Registartion/vehicle.png')}            style={styles.imageStyle2} />
          <TextInput
            value={this.state.partTxt}
            placeholder="Enter Part Name"
            style={styles.textStyle}
            maxLength={10}
            onChangeText = {(text)  => this.setState({partTxt:text})}
          /> 


        </View>




        <TouchableOpacity
          style={{ height: 50, width: 240, backgroundColor: "#f4bf42", borderRadius: 50 / 2, justifyContent: "center", alignItems: "center", alignSelf: "center", marginTop: 20,marginBottom:10 }}
          onPress={() => { Alert.alert('Your request submitted successfully') }}
        >
          <Text style={{ textStyle: "bold" }}> GET QUOTE </Text>
        </TouchableOpacity>




      </ScrollView>
    );
  }
}

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
