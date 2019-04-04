
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';



const  AppActivity = (props) =>{
  
        return(

            <Spinner
            visible={props.isloading}
            textContent={"Please Wait"}
            textStyle={styles.spinnerTextStyle}
            animation = {"fade"}
            color = "black"
          />
        
          )
    
 
}

export default AppActivity


const styles = StyleSheet.create({
spinnerTextStyle: {
    color: '#FFF'
  },

});