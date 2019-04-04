import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ImageBackground,TouchableOpacity,Image } from 'react-native';
import { Button } from 'react-native-elements';
import ColorUtilites from '../Utilites/utilites';




const HeaderBack = (props) => {
    return (
        <ImageBackground style={styles.header}>
            <StatusBar backgroundColor={ColorUtilites.BackgroundColor} barStyle="light-content" />




                    {props.leftButton == true     ?

<TouchableOpacity style={styles.containerMainView} onPress={() => props.navigation.goBack(null)}  >
<Image source={require('../Images/backArrow.png')} style={styles.imageStyle2} />
</TouchableOpacity>
                    
                
                    :  <View style={styles.containerMainView}></View>   }


                    <View style={{}}>

                        <Text style={styles.headertext}>{props.title}</Text>
                    </View>


                    <View style={styles.containerMainView}>

                        <Text style={styles.headertext}>{props.title2}</Text>
                    </View>

        </ImageBackground>
    );
}

export default HeaderBack;

const styles = StyleSheet.create({
    header: {
        backgroundColor: ColorUtilites.BackgroundColor,

        flexDirection: 'row',
        height: 60,
       
        width:"100%",
        justifyContent:"space-between",
       
        
    },
    headertext: {
        fontSize: 18,
        color: 'white',
     
        justifyContent:"center",
        marginTop:30,
    },
    imageStyle1: {

        width: 20,
        height: 20,
        marginLeft: 10,
        marginTop:30,
    },
    imageStyle2: {

        width: 20,
        height: 20,
        marginRight: 10,

    },
    containerMainView: {

        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop:30,
        marginLeft:15,
    },
});