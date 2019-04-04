
import * as yup from 'yup'
import { Formik } from 'formik'
import React, { Component, Fragment } from 'react';
import { TextInput, Text, Button, Alert, StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import Dash from 'react-native-dash';
import Utilites from '../../Utilites/utilites'
import Constant from '../../Utilites/Constant'




const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const registerNumExp = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/

export default class TestDrive extends Component {

    // static navigationOptions = { header: Header };


    constructor(props) {

        super(props)

        this.state = {

            errorValue: "",
            termsSelectionBox: 0,
        }

    }



    CheckTermsAndCondition() {


        if (this.state.termsSelectionBox === 0) {

            this.setState({ termsSelectionBox: 1 })
        }
        else {

            this.setState({ termsSelectionBox: 0 })
        }

    }



    onSubmitAction(isValid) {


        console.log(isValid)


        if(isValid)
        {


            if( this.state.termsSelectionBox == 1  )
            {

 
                   this.props.navigation.navigate('otpVerify')
            }
            else
            {
                Alert.alert('Please Select Terms and Condition')
            }


        }
        else
        {
            Alert.alert('Please Enter Valid Details')

        }


    }




    render() {
        return (

            <Formik
                style={styles.container}
                initialValues={{ name: '', mobilenumber: '', email: '', registrationNum: "", VinNum: "" }}
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
                    registrationNum: yup
                        .string().matches(registerNumExp, "Please Enter Valid Register Number")
                        .required(),
                    VinNum: yup
                        .string()
                        .max(10)

                })}
            >
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (

                    <Fragment>

                        {/* <Header title="Registration" /> */}

                        <ScrollView>



                            <View style={styles.paragraph}>

                                <Image source={require('../Images/Registartion/name.png')}
                                    style={styles.imageStyle} />
                                <TextInput
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    onBlur={() => setFieldTouched('name')}
                                    placeholder="Name"
                                    style={styles.textStyle}
                                />
                            </View>
                            {touched.name && errors.name &&
                                <Text style={{ fontSize: 10, color: 'red', alignSelf: "center" }}> {errors.name}</Text>
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
                                <Text style={{ fontSize: 10, color: 'red', alignSelf: "center" }}>{errors.mobilenumber}</Text>
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
                            {touched.mobilenumber && errors.mobilenumber &&
                                <Text style={{ fontSize: 10, color: 'red', alignSelf: "center" }}>{errors.email}</Text>
                            }



                            <View style={styles.paragraph}>

                                <Image source={require('../Images/Registartion/vehicle.png')}
                                    style={styles.imageStyle} />
                                <TextInput
                                    value={values.registrationNum}
                                    onChangeText={handleChange('registrationNum')}
                                    onBlur={() => setFieldTouched('registrationNum')}
                                    placeholder="Registration Number"
                                    style={styles.textStyle}
                                    maxLength={10}
                                />
                            </View>
                            {touched.registrationNum && errors.registrationNum &&

                                <Text style={{ fontSize: 10, color: 'red', alignSelf: "center" }}>  {errors.registrationNum}</Text>
                            }





                            <View style={{ height: 20, marginTop: 40, flexDirection: "row", justifyContent: "center" }}>

                                <Dash style={{ width: 100, marginLeft: 10 }} dashThickness={1} dashLength={5} dashGap={5} />

                                <Text style={{ color: "black", marginTop: -10, marginLeft: 10 }}> OR </Text>
                                <Dash style={{ width: 100, marginLeft: 10 }} dashThickness={1} dashLength={5} dashGap={5} />

                            </View>




                            <View style={styles.paragraph}>

                                <Image source={require('../Images/Registartion/vin_no.png')}
                                    style={styles.imageStyle} />
                                <TextInput
                                    value={values.VinNum}
                                    onChangeText={handleChange('VinNum')}
                                    onBlur={() => setFieldTouched('VinNum')}
                                    placeholder="VIN Number"
                                    style={styles.textStyle}
                                    maxLength={10}
                                />
                            </View>
                            {touched.VinNum && errors.VinNum &&
                                <Text style={{ fontSize: 10, color: 'red', alignSelf: "center" }}>{errors.VinNum}</Text>
                            }




                            <View style={{ margin: 20, flexDirection: "row", marginLeft: 50 }}>


                                <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => this.CheckTermsAndCondition()} >

                                    <Image source={this.state.termsSelectionBox === 0 ? require('../Images/Registartion/check_box.png') : require('../Images/Registartion/check_Marked.png')}
                                        style={styles.imageStyle} />

                                    <Text  style={{ paddingTop: 15 }}> I agree to </Text>

                                </TouchableOpacity>


                                <Text onPress={() => this.props.navigation.navigate('termsCondition')} style={{ paddingTop: 15, color: "black" }}>Terms And Conditions  </Text>
                            </View>



                            <TouchableOpacity
                               // disabled={!isValid}
                                // onPress = {() =>   this.onSubmitAction(isValid) }
                              onPress = {() => this.props.navigation.navigate('otpVerify')}
                             
                                style={{ height: 50, width: 240, backgroundColor: Utilites.ButtonsBGColor, borderRadius: 50 / 2, justifyContent: "center", alignItems: "center", alignSelf: "center" }}  >
                                <Text style={{ textStyle: "bold" }}> SUBMIT </Text>

                            </TouchableOpacity>



                            <Text style={{ padding: 50, alignSelf: "center" }} > SKIP REGISTRATION </Text>




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
        backgroundColor: '#ecf0f1',
        marginTop:Constant.TopHeaderConstant,
    },

    textStyle: {
        height: 40,

        borderBottomWidth: 0.5,
        flex: 1,
        borderColor: Utilites.BottomLineColorForFiled
    },

    imageStyle: {
        width: 20,
        height: 20,
        margin: 15,
    },

    paragraph: {
        marginLeft: 20,
        flexDirection: "row",
        marginRight: 30,
        marginTop: 20,
    },

});
