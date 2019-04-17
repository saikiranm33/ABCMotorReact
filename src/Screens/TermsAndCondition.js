import * as React from 'react';
import { Text, View, StyleSheet,AsyncStorage,Image,TouchableOpacity ,ScrollView} from 'react-native';
import Header from '../Components/header'
import Constant from '../Utilites/Constant'
import { checkTermsAndCondition } from '../Redux/action'
import { connect } from 'react-redux';


// You can import from local files


// or any pure javascript modules available in npm




class TermsAndCondition extends React.Component {
 constructor(props) {
    super(props);
    this.state = { 
      nameTxt: '' ,
      mobileTxt: '' ,
      emailTxt: '' ,
      registNotxt:"",
      vinTxt:"",
      };
  }

  checkItemIsAgreed(item)
{


this.props.navigation.navigate('registration',{"isItemSelected":item})

this.props.checkTerms(item)


}



  render() {
    return (
<View style = {styles.container}>



<ScrollView>



<Text style = {{padding:20,lineHeight:30}}>            

      By downloading or using the app, these terms will automatically apply to you – you should make sure therefore that you read them carefully before using the app. We are offering you this app to use for your own personal use without cost, but you should be aware that you cannot send it on to anyone else, and you’re not allowed to copy, or modify the app, any part of the app, or our trademarks in any way. You’re not allowed to attempt to extract the source code of the app, and you also shouldn’t try to translate the app into other languages, or make derivative versions. The app database rights belong to %@ but the app itself, and all the trade marks, copyright and other intellectual property rights, still belong to SIA Global IT Pvt. Ltd.\n    SIA Global along with the collaboration of %@ is committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app at any time and for any reason. We do not charge you anything for using this app but all services you book or use via the features provided by the app will be charged as per the normal rates that your dealership charges other customers who do business with them without using the app. \n             Pick and drop facility that is available in the service booking feature may attract an additional fee charged by your respective dealership which will be clearly mentioned in the service booking page of pick/drop selection and by opting for this facility you unconditionally agree to pay that fee to your respective dealership. At the same time, pick/drop facilities provided by your respective dealership are based on their resource availability and convenience. If for any reason known or unknown, your dealership is not able to provide this or any other facility/feature such as call back, get quote etc.. your respective dealership nor SIA Global can be held liable by you in any form for not providing the facility or any damages resulting from this feature as these services will be provided only upon the availability of the required resources at that point of time. You should be aware that there are certain things that SIA Global will not take responsibility for certain functions of the app, such as correct updated data being displayed in the app or correctness and timeliness of the messages, notifications and etc you receive and see in the app. They are purely system generated and depend on the data fed into the system by your dealership. Notifications and messages help you receive the required alerts conveniently but due to technical downtimes or any other unknown reason you may sometimes not receive some or all notifications via the app; in such cases as well SIA Global nor your dealership cannot be held responsible for any damages that may occur due to this.  Internet connection is mandatory to use this app and the connection can be Wi-Fi, or provided by your mobile network provider, but SIA Global cannot take responsibility for the app not working at full functionality if you don’t have access to Wi-Fi, and you don’t have any of your data allowance left.\n         If you’re using the app outside of an area with Wi-Fi, you should remember that your terms of agreement with your mobile network provider will still apply. As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the app, or other third party charges. In using the app, you’re accepting responsibility for any such charges, including roaming data charges if you use the app outside of your home territory (i.e. region or country) without turning off data roaming. If you are not the bill payer for the device on which you’re using the app, please be aware that we assume that you have received permission from the bill payer for using the app.\n     You should also remember that the app’s car data display and document storing functions purpose is to make things more convenient for you – it doesn’t replace your original documents, and you will still need to carry them along where ever required by the respective states and country’s law and order. Lastly, with respect to SIA Global’s responsibility for your use of the app, when you’re using the app, it’s important to bear in mind that although we endeavour to ensure that it is updated and correct at all times, we do rely on third parties to provide information to us so that we can make it available to you. So, it is not intended to wholly replace the need to stay informed of updates that are made through other channels such as email, SMS and personal communication by your respective dealerships throughout the car ownership experience. SIA Global accepts no liability for any loss, direct or indirect, you experience as a result of relying wholly on the functionality of the app rather than using all the available resources at your dealership to keep yourself updated about certain details of your car.\n      At some point we may wish to update the app. The app is currently available on Android and iOS – the requirements for both systems (and for any additional systems we decide to extend the availability of the app to) may change, and you’ll need to download the updates if you want to keep using the app. SIA Global does not promise that it will always update the app so that it is relevant to you and/or works with the iOS/Android version that you have installed on your device. However, you promise to always accept updates to the application when offered to you, We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination,\n   (a) the rights and licenses granted to you in these terms will end; \n    (b) you must stop using the app, and (if needed) delete it from your device.\n   Payments/Cancellation/Refund Policy\n\n%@ does not levy any fee for using this app to transact with the dealership. %@ charges users certain fees only for the use of their services. You agree to pay any such fees, as may be applicable to the Services that you use. %@ will try to ensure that you are made aware of the fees for any service being used by you.  You agree to provide correct and accurate financial information, such as credit/debit card details to the approved payment gateway or pre-paid payment instrument account details for availing services via this app. You shall not use the credit/debit card or pre-paid payment instrument which is not lawfully owned by you, i.e. in any transaction, you must use your own credit/debit card or pre-paid instrument account. The information provided by you will not be utilized or shared with any third party unless required in relation to fraud verifications or by law, regulation or court order or in accordance with the terms of the Privacy Policy. You will be solely responsible for the security and confidentiality of your credit/debit card details or pre-paid instrument account. %@ expressly disclaims all liabilities that may arise as a consequence of any unauthorized use of your credit/ debit card or pre-paid instrument account.You agree that you are solely responsible to %@ and to any third party for any breach of your obligations under these Terms of Use or other Agreements and for the consequences (including any loss or damage which %@ may suffer) for any such breach.\n Cancellation of an order requested via the app can be done at any point of time except until the time vehicle enters the service bay by using the CANCEL button available in the MANAGE BOOKINGS tab of the navigation menu. No cancellation requests will be entertained once the technician starts the job requested by you in your initial order. \nRefund requests will be accepted and addressed promptly only if the payment done was higher than the requested amount due to typo or human error. No refund requests will be accepted and entertained for any concerns or disputes raised on the services received.
</Text>




</ScrollView>


<View style = {{flexDirection:"row",height:60,justifyContent:"center",alignContent:"center"}}>

    <TouchableOpacity
         style={{height:50,backgroundColor:"#f4bf42",borderRadius:50/2 ,justifyContent:"center",alignItems:"center",alignSelf:"center",flex:1,margin:20}}
         onPress={() => this.checkItemIsAgreed(false)}>
         <Text style ={{textStyle:"bold"}}> DISAGREE </Text>
  </TouchableOpacity>



   <TouchableOpacity
         style={{height:50,backgroundColor:"#f4bf42",borderRadius:50/2 ,justifyContent:"center",alignItems:"center",alignSelf:"center",flex:1,margin:20}}
         onPress={() => this.checkItemIsAgreed(true)}>
         <Text style ={{textStyle:"bold"}}> AGREE </Text>
  </TouchableOpacity>



</View>

  
   

    

      </View>
    );
  }
}




function mapStateToProps(state) {
  return {

     

      checkItemSelection:state.checkTermsSection,


     

  };
}

function mapDispatchToProps(dispatch) {
  return {

     
      checkTerms: (item) => dispatch(checkTermsAndCondition(item)),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TermsAndCondition);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:Constant.TopHeaderConstant,
  
  },

  textStyle :{
    height: 40, 
  
    borderBottomWidth: 0.5,
    flex:1,
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
    marginTop:20,
  },

  OvalShapeView: {
         borderBottomLeftRadius: 80 * 2,
         borderBottomRightRadius: 80 * 2,
         backgroundColor:"red",
         height:200,

},
});
