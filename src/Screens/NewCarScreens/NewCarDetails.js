import React from 'react';
import { View, Text, StyleSheet, FlatList,Image,TouchableOpacity,ScrollView } from 'react-native';
import TopBarNav from 'top-bar-nav';
import Swiper from 'react-native-swiper';
import Utilites from '../../Utilites/utilites'
import ColorUtilites from '../../Utilites/utilites';
//import ColorUtilites from '../../Utilites/utilites';

const Scene = ({ index }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 20 }}>{index}</Text>
  </View>
);

const ROUTES = {
  Scene,
  // ideally you would have a ROUTES object with multiple React component scenes
};

// There are three types of labels (image, text, and element)
const ROUTESTACK = [
  { element: <Text>Overview</Text>, title: 'Scene1' },
  { element: <Text>Features</Text>, title: 'Scene2' },
  { element: <Text>Colors</Text>, title: 'Scene3' },
];

const myOverViewList = [
  { type: 'Fuel Type', value: 'Diesel' },
  { type: 'Mileage', value: '22.7' },
  { type: 'Doors', value: '5' },
  { type: 'Gears', value: '5' },
  { type: 'Seating Capacity', value: '5' },
  { type: 'Fuel Type', value: 'Diesel' },
  { type: 'Fuel Type', value: 'Diesel' },
  { type: 'Mileage', value: '22.7' },
  { type: 'Doors', value: '5' },
  { type: 'Gears', value: '5' },
  { type: 'Seating Capacity', value: '5' },
  { type: 'Fuel Type', value: 'Diesel' },
];
const myFeaturesList = [
  { type: 'Fuel Type', value: 'Diesel' },
  { type: 'Mileage', value: '22.7' },
  { type: 'Doors', value: '5' },
  { type: 'Gears', value: '5' },
  { type: 'Seating Capacity', value: '5' },
  { type: 'Fuel Type', value: 'Diesel' },
  { type: 'Mileage', value: '22.7' },
  { type: 'Doors', value: '5' },
  { type: 'Gears', value: '5' },
  { type: 'Seating Capacity', value: '5' },
  { type: 'Fuel Type', value: 'Diesel' },
  { type: 'Mileage', value: '22.7' },
];

const DataList = [

    {id:2,bannerImage:require('../../Images/banner13.jpg'),bannerText:"Well Maintained Car Available"},
    {id:2,bannerImage:require('../../Images/banner1.jpg'),bannerText:"Well Maintained Car Available"},
    {id:2,bannerImage:require('../../Images/banner11.jpg'),bannerText:"Well Maintained Car Available"},
    {id:2,bannerImage:require('../../Images/banner2.jpg'),bannerText:"Well Maintained Car Available"},
  
    ]
    

const OverView = props => {
  return (
    <View>
      <FlatList
        data={myOverViewList}
        renderItem={({ item, separators }) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
            }}>
            <View style={{ flex: 1, marginLeft: 30 }}>
              <Text style={{ textAlign: 'left' }}>{item.type}</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View
              style={{ flex: 1, justifyContent: 'flex-end', marginLeft: 30 }}>
              <Text style={{ textAlign: 'left',paddingLeft:50 }}>{item.value}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const Features = props => {
  return (
    <View>



      <FlatList
        data={myFeaturesList}
        renderItem={({ item, separators,index }) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
            }}>
            <View style={{ flex: 1, marginLeft: 30 }}>
              <Text style={{ textAlign: 'left' }}>{item.type}</Text>
            </View>
            <View>
             
            </View>
            
              
              <Image style = {{width:20,height:20,marginRight:30}} source =  {require('../../Images/NewCar/successTick.png')}/>
   
         
          </View>
        )}
      />
    </View>
  );
};


const Colors = props => {

return (
    <View>
      <FlatList
        data={myFeaturesList}
        renderItem={({ item, separators }) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-evenly',
            }}>



     <View style={{  margin: 0,backgroundColor:"#637b84",borderRadius:80/2 , height:80 ,width:80,borderColor:"#e0e1e2",borderWidth:3}}>
            </View>


    <View style={{  margin: 0,backgroundColor:"#f4b642",borderRadius:80/2 , height:80 ,width:80,borderColor:"#e0e1e2",borderWidth:3}}>
            </View>

              
              
    <View style={{  margin: 0,backgroundColor:"#c2fcc3",borderRadius:80/2 , height:80 ,width:80,borderColor:"#e0e1e2",borderWidth:3}}>
            </View>

         
          </View>
        )}
      />
    </View>
  );


}




export default class NewCarDetails extends React.Component {

  //static navigationOptions = { header: null };

  render() {
    return (
      <View style={{ flex: 1 ,backgroundColor:ColorUtilites.BackgroundColor }}>
   
  
    

      <View style = {{flex:1,margin:15,backgroundColor:"white",borderRadius:5}}>


 <Swiper style={styles.wrapper} showsButtons={false} autoplay={true} dotColor="white"      activeDot = {<View style={{backgroundColor: 'white', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginBottom: -20,}} />} dot = {<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3,  marginBottom: -20}} />}    >
        {DataList.map((item, key) => {
          return (
            <View style={styles.slide1}>
            <Image
              style={{ width: 320, height: 180,position:"relative" }}
              source={item.bannerImage}
            />
             <Text
              style={{color:"black",textAlign:"center",margin:10 }}
            >{item.bannerText}</Text>
          </View>

          )
        })}

        </Swiper>




        <TopBarNav
          // routeStack and renderScene are required props
          routeStack={ROUTESTACK}
          
          renderScene={(route, i) => {
            // This is a lot like the now deprecated Navigator component
            // let Component = ROUTES[route.title];
            // return <Component index={i} />;
            return (
              <View style = {{marginBottom:55}}>
                {route.title === 'Scene1' ? (
                  <OverView />
                ) : route.title === 'Scene2' ? (
                  <Features />
                ) : route.title === 'Scene3' ? (
                   <Colors />
                ) : (
                  <Text> NO DATA  </Text>
                )}
              </View>
            );
          }}
          // Below are optional props
          headerStyle={[styles.headerStyle, { paddingTop: 30 }]} // probably want to add paddingTop if using TopBarNav for the  entire height of screen to account for notches/status bars
          labelStyle={styles.labelStyle}
          underlineStyle={styles.underlineStyle}
          imageStyle={styles.imageStyle}
         // sidePadding={10} // Can't set sidePadding in headerStyle because it's needed to calculate the width of the tabs
          inactiveOpacity={1}
          fadeLabels={true}
        />
        <View style = {{flex:1,flexDirection:"row",position:"absolute",bottom:0, borderRadius:5,}}>
        
        <TouchableOpacity
              style={{ height: 50, backgroundColor: Utilites.ButtonsBGColor, justifyContent: "center", alignItems: "center", alignSelf: "center", flex: 1,borderBottomLeftRadius:5}}
              onPress={() => this.props.navigation.navigate('onRoadPrice')}
            >
              <Text style={{ textStyle: "bold",color:"white" }}> ON ROAD PRICE </Text>
            </TouchableOpacity>



            <TouchableOpacity
              style={{ height: 50, backgroundColor: "#f4bf42", justifyContent: "center", alignItems: "center", alignSelf: "center", flex: 1,borderBottomRightRadius:5}}
              onPress={() => this.props.navigation.navigate('testDrive')}
            >
              <Text style={{ textStyle: "bold",color:"white" }}> TEST DRIVE </Text>
            </TouchableOpacity>

            </View>

         </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    borderBottomWidth: 0.5,
  

    height:50,
    borderRadius:5,
  },
  labelStyle: {
    fontSize: 15,
    
    color: 'red',

  },
  imageStyle: {
    height: 20,
    width: 20,
   // tintColor: '#e6faff',
  

  },
  underlineStyle: {
    height: 3,
    backgroundColor: 'red',

  

  },
  wrapper: {
    height:200,
 
  backgroundColor:"#e0e0e0",

  },
  header: {
    backgroundColor: ColorUtilites.BackgroundColor,
    flexDirection: 'row',
    height: 60,
    justifyContent:"space-evenly"

  },
  slide1: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:5,
  
  },
  
 
});
