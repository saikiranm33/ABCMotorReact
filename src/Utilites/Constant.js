
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
'ImageURL':"http://dev.smarttoolkit.co/uploadfiles/",
'LoadingColor' :"#fefefe",
};


 

 //ABC Demo http://devservices.smarttoolkit.co/ToolKitService.svc/
 //ABC 'ImageURL':"http://dev.smarttoolkit.co/uploadfiles/",



//Lakshmi Demo http://lakshmiservices.smarttoolkit.co/ToolKitService.svc/
//Lakshmi 'ImageURL':"http://dev.smarttoolkit.co/uploadfiles/",





 // http://rksservices.smarttoolkit.co/ToolKitService.svc/
 //RKS 'ImageURL':"http://rks.smarttoolkit.co/uploadfiles/"", 










export default Constant;
