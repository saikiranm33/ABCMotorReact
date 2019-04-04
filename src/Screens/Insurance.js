import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Alert, Picker } from 'react-native';
import Header from '../Components/header'
import ModalDropdown from 'react-native-modal-dropdown';
import Constant from '../Utilites/Constant'

import SearchableDropdown from 'react-native-searchable-dropdown';

// You can import from local files


// or any pure javascript modules available in npm




export default class Insurance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brandTxt: '',
      modelTxt: '',
      yeartxt: "",
      renewalDateTxt: "",

    };
  }
  static navigationOptions = { header: null };

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
      <View style={styles.container}>





        <ScrollView>

          <Image source={require('../Images/Insurance/insurance_get_quote.png')} style={{ width: 250, height: 250, alignSelf: "center" }} />


          <Text style={{ textStyle: "bold", alignSelf: "center" }}> Provide Car Details to Get Quoye </Text>

          <View style={styles.paragraph}>

            <Image source={require('../Images/Registartion/brand.png')}
              style={styles.imageStyle2} />
            <Picker
              selectedValue={this.state.brandTxt}
              style={styles.textStyle}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ brandTxt: itemValue })
              }>
              <Picker.Item label="Select Brand" value="Select Brand" />
              <Picker.Item label="Maruti" value="java" />
              <Picker.Item label="Hyundai" value="js" />

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
              <Picker.Item label="Select Model" value="Select Model" />
              <Picker.Item label="Swift" value="swift" />
              <Picker.Item label="Dzire" value="Dzire" />
            </Picker>
          </View>

          <View style={styles.paragraph}>

            <Image source={require('../Images/Registartion/calendar.png')}
              style={styles.imageStyle2} />
            <Picker
              selectedValue={this.state.yeartxt}
              style={styles.textStyle}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ yeartxt: itemValue })
              }>
              <Picker.Item label="Select Purchase Year" value="Select Purchase year" />
              <Picker.Item label="2018" value="swift" />
              <Picker.Item label="2019" value="Dzire" />
            </Picker>
          </View>

          <View style={styles.paragraph}>
            <Image source={require('../Images/Registartion/calendar.png')}
              style={styles.imageStyle2} />
            <Picker
              selectedValue={this.state.renewalDateTxt}
              style={styles.textStyle}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ renewalDateTxt: itemValue })
              }>
              <Picker.Item label="Select Renewal Date" value="Select" />
              <Picker.Item label="1" value="swift" />
              <Picker.Item label="2" value="Dzire" />
              <Picker.Item label="3" value="Dzire" />
            </Picker>
          </View>



          <TouchableOpacity
            style={{ height: 50, width: 240, backgroundColor: "#f4bf42", borderRadius: 50 / 2, justifyContent: "center", alignItems: "center", alignSelf: "center", marginTop: 20, marginBottom: 20 }}
            onPress={() => { Alert.alert('Your request submitted successfully') }}
          >
            <Text style={{ textStyle: "bold" }}> GET QUOTE </Text>
          </TouchableOpacity>




        </ScrollView>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constant.TopHeaderConstant,
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
