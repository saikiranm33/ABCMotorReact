import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import TopBarNav from 'top-bar-nav';
import Swiper from 'react-native-swiper';
import Utilites from '../../Utilites/utilites'
import ColorUtilites from '../../Utilites/utilites';
import Constant from '../../Utilites/Constant'
import axios from 'axios'
import getDataItem from '../../Storage/getAsyncData'
import Spinner from 'react-native-loading-spinner-overlay';
import { FlatGrid } from 'react-native-super-grid';
import FastImage from 'react-native-fast-image'
import CustomSpinner from '../../Utilites/CustomSpinner'


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



const DataList = [

  { id: 2, bannerImage: require('../../Images/banner13.jpg'), bannerText: "Well Maintained Car Available" },
  { id: 2, bannerImage: require('../../Images/banner1.jpg'), bannerText: "Well Maintained Car Available" },
  { id: 2, bannerImage: require('../../Images/banner11.jpg'), bannerText: "Well Maintained Car Available" },
  { id: 2, bannerImage: require('../../Images/banner2.jpg'), bannerText: "Well Maintained Car Available" },

]


const OverView = props => {

  let keys = Object.keys(props.DataList)
  let value = Object.values(props.DataList)

  console.log(keys)

  console.log(value)

  return (
    <View>
      <FlatList
        data={keys}
        renderItem={({ item, separators, index }) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
            }}>
            <View style={{ flex: 1, marginLeft: 30 }}>
              <Text style={{ textAlign: 'left' }}>{keys[index]}</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View
              style={{ flex: 1, justifyContent: 'flex-end', marginLeft: 30 }}>
              <Text style={{ textAlign: 'left' }}>{value[index]}</Text>
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
        data={props.myFeaturesList}
        renderItem={({ item, separators, index }) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
            }}>
            <View style={{ flex: 1, marginLeft: 30 }}>
              <Text style={{ textAlign: 'left' }}>{item.FeatureName}</Text>
            </View>
            <View>

            </View>


            {item.IsAvailable === "True" ?

              <Image style={{ width: 20, height: 20, marginRight: 30 }} source={require('../../Images/NewCar/successTick.png')} />

              :

              <Image style={{ width: 20, height: 20, marginRight: 30 }} source={require('../../Images/NewCar/wrongTick.png')} />
            }






          </View>
        )}
      />
    </View>
  );
};


const Colors = props => {

  console.log(props.myColorList)

  return (

    <FlatGrid
      itemDimension={80}
      spacing={10}
      items={props.myColorList}
      renderItem={({ item }) => (<View style={{ backgroundColor: item.ColourCode, borderRadius: 80 / 2, height: 80, width: 80, borderColor: "#e0e1e2", borderWidth: 3 }}>
      </View>)}
    />


  );


}


export default class NewCarDetails extends React.Component {


  constructor(props) {

    super(props)

    this.state = {

      isLoading: false,
      overListArr: [],
      featuresListArr: [],
      colorsListArr: [],
      newCarImages: [],

    }

  }


  GetCarInfoList = async (item) => {


    this.setState({ isLoading: true })


    const { navigation } = this.props;

    const newCarID = navigation.getParam('SelectedCarID', '');



    //console.log("Banner List Called")


    let bodyFormData =
    {
      "DeviceId": item[0].DeviceId,
      "Version": item[0].Version,
      "CustomerId": item[1],
      "NewCarId": newCarID,
    }

    console.log(bodyFormData)

    this.setState({ isLoading: true })

    axios({
      method: 'post',
      url: Constant.ServiceURL + 'GetNewCarInfo',
      data: bodyFormData,

    })
      .then(function (response) {

        console.log(response);

        this.setState({ isLoading: false })

        console.log("GetNewCarInfo List Response")


        let responseValue = response.data



        if (responseValue.Status.StatusCode == 2) {
          console.log("Success")

          this.setState({ overListArr: responseValue.Data.NewCarinfo })

          this.setState({ featuresListArr: responseValue.Data.NewcarFeatureInfo })

          this.setState({ colorsListArr: responseValue.Data.ColourList })

          this.setState({ newCarImages: responseValue.Data.Newcarimages })

        }
        else if (responseValue.Status.StatusCode == 1) {
          if (responseValue.Status.DataCode == -1) {


            Alert.alert("Multiple Users Logged Please Register Again")

            Alert.alert(
              'Multiple Users Logged ',
              'Please Register Again',
              [

                { text: 'OK', onPress: () => { this.onLogOut() } },

              ]
            )


            console.log("Multiple User Called ")

          }


        }



      }.bind(this))
      .catch(error => {

        this.setState({ isLoading: false })


        console.log(error), this.setState({ isLoading: false })
        // Alert.alert(`Something went wrong please try after some time`);

        console.error(error);


      }
      )
      .then(function () {

        this.setState({ isLoading: false })

        // always executed
      });

  }


  async checkAppVersion() {

    console.log("Hello World")

    let requiredArr = []

    getDataItem('CustomerID', (CustomerID) => {

      getDataItem('CustomerDetails', (userToken) => {


        requiredArr.push(JSON.parse(userToken))
        requiredArr.push(CustomerID)

        console.log(requiredArr)


        this.setState({ requiredInfo: requiredArr })

        this.GetCarInfoList(requiredArr)


      });

    });


  }

  componentDidMount() {


    this.checkAppVersion()

  }










  //static navigationOptions = { header: null };

  render() {


    const { navigation } = this.props;

    const newCarPrice = navigation.getParam('SelectedCarPrice', '');

    return (
      <View style={{ flex: 1, backgroundColor: ColorUtilites.BackgroundColor }}>

<CustomSpinner   isLoading = {this.state.isLoading} />


        <View style={{ flex: 1, margin: 15, backgroundColor: "white", borderRadius: 5 }}>


          <Swiper style={styles.wrapper} showsButtons={false} autoplay={true} dotColor="white" activeDot={<View style={{ backgroundColor: 'white', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginBottom: -20, }} />} dot={<View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginBottom: -20 }} />}    >
            {this.state.newCarImages.map((item, key) => {
              return (
                <View style={styles.slide1}>


                  <FastImage
                    style={{ width: 320, height: 180, position: "relative" }}
                    source={{
                      uri: Constant.ImageURL + "/" + item.Imagepath
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                    placeholderColor="red"
                  />



                  {item.IsProfilePic === true ?

                    <Text
                      style={{ color: "black", textAlign: "center", margin: 10, fontSize: 20 }}
                    > {'\u20B9'} {newCarPrice}</Text>

                    :

                    <Text
                      style={{ color: "black", textAlign: "center", margin: 10 }}
                    ></Text>

                  }
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
                <View style={{ marginBottom: 55 }}>
                  {route.title === 'Scene1' ? (
                    <OverView DataList={this.state.overListArr} />
                  ) : route.title === 'Scene2' ? (
                    <Features myFeaturesList={this.state.featuresListArr} />
                  ) : route.title === 'Scene3' ? (
                    <Colors myColorList={this.state.colorsListArr} />
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
          <View style={{ flex: 1, flexDirection: "row", position: "absolute", bottom: 0, borderRadius: 5, }}>

            <TouchableOpacity
              style={{ height: 50, backgroundColor: Utilites.ButtonsBGColor, justifyContent: "center", alignItems: "center", alignSelf: "center", flex: 1, borderBottomLeftRadius: 5 }}
              onPress={() => this.props.navigation.navigate('onRoadPrice')}
            >
              <Text style={{ textStyle: "bold", color: "white" }}> ON ROAD PRICE </Text>
            </TouchableOpacity>



            <TouchableOpacity
              style={{ height: 50, backgroundColor: "#f4bf42", justifyContent: "center", alignItems: "center", alignSelf: "center", flex: 1, borderBottomRightRadius: 5 }}
              onPress={() => this.props.navigation.navigate('testDrive')}
            >
              <Text style={{ textStyle: "bold", color: "white" }}> TEST DRIVE </Text>
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


    height: 50,
    borderRadius: 5,
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
    height: 200,

    backgroundColor: "#e0e0e0",

  },
  header: {
    backgroundColor: ColorUtilites.BackgroundColor,
    flexDirection: 'row',
    height: 60,
    justifyContent: "space-evenly"

  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,

  },


});
