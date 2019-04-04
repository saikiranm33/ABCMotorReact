import React, { Component, Fragment } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, Alert,KeyboardAvoidingView ,TextInput} from 'react-native';
import * as yup from 'yup'
import { Formik } from 'formik'
import Utilites from '../Utilites/utilites'
import { Dropdown } from 'react-native-material-dropdown';
import Constant from '../Utilites/Constant'




const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const registerNumExp = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/

export default class Finance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newCarSelection :0,
      oldCarSelection:0,
      
    };
  }

  dataList = [
    {
      value: 'Select ',
    },
    {
      value: 'Swift',
    }, {
      value: 'DZIRE',
    }, {
      value: 'Maruti',
    }];

  
    checkNewCarSelection() {


      if (this.state.newCarSelection === 0) {

          this.setState({ newCarSelection: 1 })
      }
      else {

          this.setState({ newCarSelection: 0 })
      }

  }

  checkOldCarSelection() 
  {

    if (this.state.oldCarSelection === 0) {

        this.setState({ oldCarSelection: 1 })
    }
    else {

        this.setState({ oldCarSelection: 0 })
    }

}





  render() {
    return (
      <Formik
        style={styles.container}
        initialValues={{ name: '', mobilenumber: '', email: '', brand: "", model: "", year: "" }}
        onSubmit={values => Alert.alert(JSON.stringify(values))}

        validationSchema={yup.object().shape({
          name: yup
            .string()
            .min(3)
            .required(),
          mobilenumber: yup
            .string().matches(phoneRegExp, "Please Enter Valid Mobile Number")
            .min(10)
            .max(10)
            .required(),
          email: yup
            .string()
            .email()
            .required(),
          brand: yup
            .string()
            .max(20),
          model: yup
            .string()
            .max(20),
          year: yup
            .string()
            .max(20)

        })}
      >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (

          <Fragment>

        


            <ScrollView style = {styles.container}>


              <View style={styles.paragraph}>

                <Image source={require('../Images/Registartion/name.png')}
                  style={styles.imageStyle} />
                <TextInput
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={() => setFieldTouched('name')}
                  placeholder="Name"
                  style={styles.textStyle}
                  // overlayColor="#0496FF"
                  // // header={() => <Text>Header</Text>}
                  // // footer={() => <Text>Footer</Text>}
                  // animationConfig={{
                  //   duration: 350,
                  //   delay: 100,
                  // }}
                />
              </View>
              {touched.name && errors.name &&
                <Text style={styles.errorTextStyle}> {errors.name}</Text>
              }




              <View style={styles.paragraph}>


                <Image source={require('../Images/Registartion/mobile.png')}
                  style={styles.imageStyle} />

                <TextInput
                  value={values.mobilenumber}
                  onChangeText={handleChange('mobilenumber')}
                  onBlur={() => setFieldTouched('mobilenumber')}
                  placeholder="Mobile Number"
                  style={styles.textStyle}
                  maxLength={10}
                />
              </View>
              {touched.mobilenumber && errors.mobilenumber &&
                <Text style={styles.errorTextStyle}>{errors.mobilenumber}</Text>
              }

              <View style={styles.paragraph}>


                <Image source={require('../Images/Registartion/mail.png')}
                  style={styles.imageStyle} />

                <TextInput
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  placeholder="Email"
                  style={styles.textStyle}
                  maxLength={25}
                />
              </View>
              {touched.email && errors.email &&
                <Text style={styles.errorTextStyle}>{errors.email}</Text>
              }



              <View style={styles.dropDownConatiner}>


                <Image source={require('../Images/Registartion/brand.png')}
                  style={styles.dropImageStyle} />

                <Dropdown
                  value={values.brand}
                  onChangeText={handleChange('Brand')}
                  onBlur={() => setFieldTouched('Brand')}
                  placeholder="Select Brand"
                  containerStyle={styles.DropDownStyle}
                  maxLength={25}
                  data={this.dataList}
                />
              </View>
              {touched.brand && errors.brand &&
                <Text style={styles.errorTextStyle}>{errors.brand}</Text>
              }

              <View style={styles.dropDownConatiner}>


                <Image source={require('../Images/Registartion/vehicle.png')}
                  style={styles.dropImageStyle} />

                <Dropdown
                  value={values.model}
                  onChangeText={handleChange('model')}
                  onBlur={() => setFieldTouched('model')}
                  placeholder="Select Model"
                  containerStyle={styles.DropDownStyle}
                  maxLength={25}
                  data={this.dataList}
                />
              </View>
              {touched.model && errors.model &&
                <Text style={styles.errorTextStyle}>{errors.model}</Text>
              }



              <View style={{ margin: 20, flexDirection: "row", marginLeft: 50 }}>


                <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => this.checkNewCarSelection()} >

                  <Image source={this.state.newCarSelection === 0 ? require('../Images/Registartion/check_box.png') : require('../Images/Registartion/check_Marked.png')}
                    style={styles.imageStyle} />

                  <Text style={{ paddingTop: 15 }}> NEW CAR </Text>

                </TouchableOpacity>


                <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => this.checkOldCarSelection()} >

                  <Image source={this.state.oldCarSelection === 0 ? require('../Images/Registartion/check_box.png') : require('../Images/Registartion/check_Marked.png')}
                    style={styles.imageStyle} />

                  <Text style={{ paddingTop: 15 }}> OLD CAR </Text>

                </TouchableOpacity>


              </View>


              <View style={styles.dropDownConatiner}>


                <Image source={require('../Images/Registartion/vehicle.png')}
                  style={styles.dropImageStyle} />

                <Dropdown
                  value={values.year}
                  onChangeText={handleChange('year')}
                  onBlur={() => setFieldTouched('year')}
                  placeholder="Select Year"
                  containerStyle={styles.DropDownStyle}
                  maxLength={25}
                  data={this.dataList}
                />
              </View>
              {touched.year && errors.year &&
                <Text style={styles.errorTextStyle}>{errors.year}</Text>
              }





              <TouchableOpacity
                // disabled={!isValid}
                // onPress = {() =>   this.onSubmitAction(isValid) }
                onPress={() => Alert.alert('Requested Submitted Successfully') }

                style={{ height: 50, width: 240, backgroundColor: Utilites.ButtonsBGColor, borderRadius: 50 / 2, justifyContent: "center", alignItems: "center", alignSelf: "center",margin:50 }}  >
                <Text style={{ textStyle: "bold" }}> SUBMIT </Text>

              </TouchableOpacity>
             
            </ScrollView>

          </Fragment>
        )}
      </Formik>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:Constant.TopHeaderConstant + 10

  },

  textStyle:
  {
    height: 40,
    borderBottomWidth: 0.5,
    borderColor: Utilites.BottomLineColorForFiled,
    flex: 1,
  },

  DropDownStyle:
  {
    height: 50,
    //borderBottomWidth: 0.5,
    borderColor: Utilites.BottomLineColorForFiled,
    flex: 1,
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    alignContent: "center",

  },
  errorTextStyle: {
    fontSize: 10,
    color: 'red',
    alignSelf: "center",
  },
  dropImageStyle: {
    width: 20,
    height: 20,
    margin: 15,
    marginTop: 35,
  },

  imageStyle: {
    width: 20,
    height: 20,
    margin: 15,
  },
  dropDownConatiner: {
    marginLeft: 20,
    flexDirection: "row",
    marginRight: 30,
  },

  paragraph: {
    marginLeft: 20,
    flexDirection: "row",
    marginRight: 30,
   
  },

  OvalShapeView: {
    borderBottomLeftRadius: 80 * 2,
    borderBottomRightRadius: 80 * 2,
    backgroundColor: "red",
    height: 200,
  },
});
