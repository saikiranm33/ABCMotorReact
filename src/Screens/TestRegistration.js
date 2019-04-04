import Carousel ,{ Pagination }from 'react-native-snap-carousel';
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList,Image,TouchableOpacity,ScrollView } from 'react-native';

export default class TestRegistration extends Component {

 myEntries = [1,2,3,4,5,5,6,6,6]
  DataList = [

  { id: 2, bannerImage: require('../Images/banner2.jpg'), bannerText: "Well Maintained Car Available" },
  { id: 2, bannerImage: require('../Images/banner13.jpg'), bannerText: "Well Maintained Car Available" },
  { id: 2, bannerImage: require('../Images/banner7.jpg'), bannerText: "Well Maintained Car Available" },

]

 pagination () {
  const { entries, activeSlide } = this.state;
  return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
        dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.92)'
        }}
        inactiveDotStyle={{
            // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
  );
}

    _renderItem ({item, index}) {
        return (
            <View style={{flex:1,justifyContent:"center"}}>
               <Image source = {item.bannerImage} style = {{width:"100%",height:200}}  />
            </View>
        );
    }

    render () {
        return (
          <View style = {{flex:1,justifyContent:"center"}}> 
            <Carousel
            style = {{backgroundColor:"red",justifyContent:"center",flex:1}}
              ref={(c) => { this._carousel = c; }}
              data={this.DataList}
              renderItem={this._renderItem}
              sliderWidth={350}
              itemWidth={350}
              autoplay={true}
              loop = {true}
              layout={'default'} 
              layoutCardOffset={`18`} 
            />
{this.pagination}
           
            </View>
        );
    }
}


const styles = StyleSheet.create({


  title : {


  }






})