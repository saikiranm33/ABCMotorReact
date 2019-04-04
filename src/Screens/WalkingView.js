import * as React from 'react';
import { Text, View, StyleSheet,ImageBackground ,Image,Alert,TouchableOpacity,StatusBar} from 'react-native';
import Swiper from 'react-native-swiper';
import ColorUtilites from '../Utilites/utilites';
import DeviceInfo from 'react-native-device-info';
import {storeDataLocal} from '../Redux/action'




 export default class WalkingView extends React.Component {

  myDataList =
  [
      {
      id:1 , image: require('../Images/HelpScreen1.png'),message:"Conveniently schedule services & track service status."
      },
       {
      id:2 , image: require('../Images/HelpScreen2.png'),message:"Receive timely alerts related to your car."
      },
       {
      id:3 , image: require('../Images/HelpScreen3.png'),message:"Receive timely alerts related to your car."
      },
       {
      id:4 , image: require('../Images/HelpScreen4.png'),message:"Conveniently submit service feedbacks."
      },
       {
      id:5 , image: require('../Images/HelpScreen5.png'),message:"Store all your vehicle related documents at one place."
      },
       {
      id:6 , image: require('../Images/HelpScreen6.png'),message:"Receiving On-Road price quotes will be a breeze from now on."
      },
     
  ];

  




  MoveToNextScreen()
  {

    const { navigation } = this.props;

    const userInfo = navigation.getParam('userInfo', '');

    this.props.navigation.push('registration',{"userInfo":userInfo})

   

  }

  



 
  static navigationOptions = { header: null };

  render() 
  {
   
    console.log("Redux Stored Values  ",this.props.loadValue)

    return (
    
     <ImageBackground style={styles.backgrounStyle}
          source={require('../Images/info_bg.png')}>
   <Swiper style={styles.wrapper} showsButtons={false} loop = {false} dotColor = "white" activeDotColor = "yellow">




{this.myDataList.map((swipeItem, index) => {
  return(
   
  
   

          <View style = {{flex:1 ,justifyContent:"center",alignItems:"center"}}>
           <StatusBar backgroundColor= {ColorUtilites.BackgroundColor} barStyle="light-content" />

          <Image style = {styles.logo} source = {swipeItem.image}/>
          <Text style = {{color:"white",textAlign:"center"}}> {swipeItem.message}</Text>

        <Image style = {styles.carStyle} source = {require('../Images/HelpCarImage.png')}/>
          
          <View style = {{width:"100%",backgroundColor:"white",height:0.5, bottom:50, left:0, position: 'absolute'}}></View>


         <TouchableOpacity style ={{bottom:0, right:0, position: 'absolute'}}  onPress={() => this.MoveToNextScreen()}>

               <Image  style = {{width:50,height:50}} source =  {swipeItem.id === 6
                          ? require('../Images/signUpTick.png')
                          :null  }/>

                          </TouchableOpacity>
          </View>
        
  )


})}
        </Swiper>
     </ImageBackground>

    );
  }
}















const styles = StyleSheet.create({
  
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
   
    textAlign: 'center',
  },

  logo: {
    height: 150,
    width: 150,
  },
  carStyle:{
    height: 60,
    width: 150,
    bottom:50, 
    position: 'absolute',
  },

  backgrounStyle: {
    height: "100%",
    width: "100%",
  },
});