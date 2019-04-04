
import React, { Component } from 'react';
import {

  Dimensions,
  AsyncStorage

} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const screenHeight = Dimensions.get('window').height;

const Constant = 
{
'TopHeaderConstant': - (screenWidth + screenHeight/5)/2  + 40,
'ServiceURL': "http://devservices.smarttoolkit.co/ToolKitService.svc/",
};


 //Lakshmi Demo http://lakshmiservices.smarttoolkit.co/ToolKitService.svc/

 //ABC Demo http://devservices.smarttoolkit.co/ToolKitService.svc/

export default Constant;
