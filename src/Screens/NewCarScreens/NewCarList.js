import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Alert, Picker } from 'react-native';
 import Header from '../../Components/header'

import CustomFlatList from '../../Components/customFlatList'
import Constant from '../../Utilites/Constant'





export default class NewCarList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      brandTxt: '',
      modelTxt: '',
      partTxt: '',
      language: '',
    };

    this.updateMyData = this.updateMyData.bind(this);

  }
 // static navigationOptions = { header: null };

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

  updateMyData(item) {
   
    this.props.navigation.navigate('newVariantList')
  }


  render() {
    return (
      <View style={styles.container}>


        

<View  style = {{marginTop:50 ,flex:1}}>    

         <CustomFlatList  updateList = {this.updateMyData} />

 </View>
     

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#d4d6d8",
    marginTop:Constant.TopHeaderConstant - 100,
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