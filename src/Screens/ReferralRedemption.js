import * as React from 'react';
import { Text, View, StyleSheet,TextInput,Image,TouchableOpacity ,ScrollView,Alert} from 'react-native';
import Header from '../Components/header'
import Constant from '../Utilites/Constant'
import Utilites from '../Utilites/utilites'

// You can import from local files


// or any pure javascript modules available in npm




export default class ReferralRedemption extends React.Component {
 constructor(props) {
    super(props);
    this.state = { 
      referralTxt: '' ,
  
      };
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
         onPress={() => Alert.alert('Request has been Sent Succesfully')}
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
