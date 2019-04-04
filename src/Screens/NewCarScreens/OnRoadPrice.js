import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Alert, Picker } from 'react-native';
import Header from '../../Components/header'
import Constant from '../../Utilites/Constant'
import ModalDropdown from 'react-native-modal-dropdown';


export default class OnRoadPrice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           cityTxt:"",
           centerTxt:"",
           extendBox:0,
           basicAccessories:0,
        };
    }
  //  static navigationOptions = { header: null };

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


    extendedWarrantSelection()
    {

        if (this.state.extendBox === 0)
        {

            this.setState({extendBox:1})
        }
        else
        {

            this.setState({extendBox:0})
        }

    }
    
    basiAccessoriesSelection()
    {

        if (this.state.basicAccessories === 0)
        {

            this.setState({basicAccessories:1})
        }
        else
        {

            this.setState({basicAccessories:0})
        }


    }




    render() {
        return (
            <ScrollView style={styles.container}>


             

                <Text style={styles.subTitleStyle}>On-Road Price Request Form</Text>


                <View style = {{flex:1}}>


                <View style={styles.paragraph}>

                    <Image source={require('../../Images/Registartion/city.png')}
                        style={styles.imageStyle2} />
                    <Picker
                        selectedValue={this.state.brandTxt}
                        style={styles.textStyle}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ brandTxt: itemValue })
                        }>
                        <Picker.Item label="Select City" value="Select" />
                        <Picker.Item label="HYDERABAD" value="java" />
                        <Picker.Item label="VIZAG" value="js" />
                    </Picker>
                </View>





                <View style={styles.paragraph}>

                     <Image source={require('../../Images/Registartion/city.png')}
                        style={styles.imageStyle2} />
                    <Picker
                        selectedValue={this.state.modelTxt}
                        style={styles.textStyle}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ modelTxt: itemValue })
                        }>
                        <Picker.Item label="Select Center" value="Select" />
                        <Picker.Item label="Hitech City" value="swift" />
                        <Picker.Item label="Uppal" value="Dzire" />
                    </Picker>
                </View>

           </View>


                <Text style={styles.subTitleStyle}> Also include the cost of</Text>


                <View style={{flex:1,marginLeft:50}}>


               <TouchableOpacity style={{flex:1,flexDirection:"row"}} onPress = {()=>this.extendedWarrantSelection()} >
              
                <Image source =   {this.state.extendBox === 0 ? require('../../Images/Registartion/check_box.png') :require('../../Images/Registartion/check_Marked.png')   }      
                        style={styles.imageStyle2} />
                    <Text style={{marginTop:10}}>Extended Warranty</Text>
                </TouchableOpacity>


                <TouchableOpacity style={{flex:1,flexDirection:"row"}} onPress = {()=>this.basiAccessoriesSelection()} >

                    <Image source =   {this.state.basicAccessories === 0 ? require('../../Images/Registartion/check_box.png') :require('../../Images/Registartion/check_Marked.png')   }      
                        style={styles.imageStyle2} />
                    <Text  style={{marginTop:10}}>Basic Accessories</Text>
                </TouchableOpacity>


            </View>


                <TouchableOpacity
                    style={{ height: 50, width: 240, backgroundColor: "#f4bf42", borderRadius: 50 / 2, justifyContent: "center", alignItems: "center", alignSelf: "center", marginTop: 30 }}
                    onPress={() => { Alert.alert('Your request submitted successfully') }}
                >
                    <Text style={{ textStyle: "bold" }}> SUBMIT </Text>
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
        flex:1,
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
        flex:1,
    },
    subTitleStyle:{
        alignSelf: "flex-start", 
        textAlign: "left",
      
        marginLeft:30 ,
        marginTop:20,

    }

});
