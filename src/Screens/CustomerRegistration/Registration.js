
import * as yup from 'yup'
import { Formik } from 'formik'
import React, { Component, Fragment } from 'react';
import { TextInput, Text, Button, Alert, StyleSheet, View, Image, TouchableOpacity, ScrollView, AsyncStorage, ActivityIndicator } from 'react-native';
import Dash from 'react-native-dash';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import Utilites from '../../Utilites/utilites'
import Constant from '../../Utilites/Constant'
import { loadTODOTask,checkTermsAndCondition } from '../../Redux/action'
import getDataItem from '../../Storage/getAsyncData'


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const registerNumExp = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/


class Registration extends Component {



    constructor(props) {

        super(props)

        this.state = {

            errorValue: "",
            termsSelectionBox: false,

            isLoading: false,
            gotResponse: null,
            userValues: "",
            customerDetails:"",
    
        }

    }





    CheckTermsAndCondition() {




        if (this.state.termsSelectionBox === false) {

            this.setState({ termsSelectionBox: true })

            this.props.checkTerms(true)
        }
        else {

            this.setState({ termsSelectionBox: false })
            this.props.checkTerms(false)
        }

    }


componentWillMount()
{
    console.log("Called Component Will Mount")

    
}





    componentDidMount() {

        console.log("Called Component DiD Mount")

        AsyncStorage.setItem("IsUserLogged",false)
        

        const { navigation } = this.props;

        const empID = navigation.getParam('userInfo', '');

        this.setState({ userValues: empID })

       
        this.props.checkTerms(false)
     
    


      
        //console.log(empID)

    }

    onSubmitAction(isValid, values) {



        let requestResponse = [];

        requestResponse.push(values)
        requestResponse.push(this.state.userValues)

        console.log(requestResponse)





        this.setState({customerDetails:requestResponse})


        // let bodyFormData =
        // {
        //     "ContactNumber": "00",
        //     "CustomerName": "Mahesh Babu",
        //     "Email": "MaheshBabu@gmail.com",
        //     "VehicleRegistrationNumber": "RR09RR0909",
        //     "VinNumber": "RR09RR0909",
        //     "Version": "1.0",
        //     "DeviceId": "hjgsdsgdisgdigsidgsidgisdgigsd-jsgdsgdsdgs-sdkshdkshdkshd",
        //     "CustomerAppType": "I",

    
        // }

      //  this.props.loadTask(bodyFormData)


        if (isValid) {



            if (this.state.termsSelectionBox == 1) {



                this.props.loadTask(requestResponse)

                // this.props.navigation.navigate('otpVerify')
            }
            else {
                Alert.alert('Please Select Terms and Condition')
            }


        }
        else {
            Alert.alert('Please Enter Valid Details')

        }


    }






    checkVersionCondition(item, ) {



        if (item.Status.StatusCode == 2) 
        {


            AsyncStorage.setItem("CustomerID", item.Data.CustomerId)
            AsyncStorage.setItem("LoyaltyEnrolled", item.Data.LoyaltyEnrolled)


           

            let isVehicleExisted = item.Data.IsVehicleExisted


            let otpServer = item.Data.OTP

            Alert.alert(

                // This is Alert Dialog Title
                'Success',

                // This is Alert Dialog Message. 
                'Please Click OK to Continue',
                [

                     // Second Cancel Button in Alert Dialog.
                     { text: 'Cancel', onPress: () => console.log('Cancel Button Pressed'), style: 'cancel' },

                    // First Text Button in Alert Dialog.

                    { text: 'OK', onPress: () => this.props.navigation.navigate('otpVerify', { "OTP": otpServer,"isVehicleExisted": isVehicleExisted,"CustomerInfo":this.state.customerDetails,"CustomerID":item.Data.CustomerId}) },

                    

                   

                ]

            )

        }
        else {

            Alert.alert(JSON.stringify(item.Status.StatusMsg))
        }



    }


    componentWillReceiveProps(nextProps) {

        console.log("My Props")

      
     

        this.setState({isLoading:nextProps.loading})

        
        console.log(nextProps.checkItemSelection)

        this.setState({ termsSelectionBox: nextProps.checkItemSelection })


        console.log(typeof nextProps.products)


        if (nextProps.products != this.props.products) {

            if (nextProps.products != null) {

                console.log("Required Status in props")
                console.log(nextProps.products)
                console.log(nextProps.products.Status)
                console.log(nextProps.products.Status.StatusCode)


                let requiredResponse = nextProps.products

                {
                    requiredResponse.Status == null || "undefined" || [] ? this.checkVersionCondition(requiredResponse) : Alert.alert("Something Went Wrong 1")

                }

            }
            else {
                console.log("STATUS Failed at length ")
            }

        }
        else {
            console.log("STATUS Failed at Props not matching")
        }





    }

  



    render() {

        const { error,  loadList } = this.props;


        console.log(loadList)

      

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


                        <ScrollView style={styles.container}>



                            <View style={styles.paragraph}>

                                <Image source={require('../../Images/Registartion/name.png')}
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


                                <Image source={require('../../Images/Registartion/mobile.png')}
                                    style={styles.imageStyle} />

                                <TextInput
                                    value={values.mobilenumber}
                                    onChangeText={handleChange('mobilenumber')}
                                    keyboardType = {"phone-pad"}
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


                                <Image source={require('../../Images/Registartion/mail.png')}
                                    style={styles.imageStyle} />

                                <TextInput
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={() => setFieldTouched('email')}
                                    placeholder="Email"
                                    keyboardType = {"email-address"}
                                    style={styles.textStyle}
                                    maxLength={25}
                                />
                            </View>
                            {touched.mobilenumber && errors.mobilenumber &&
                                <Text style={{ fontSize: 10, color: 'red', alignSelf: "center" }}>{errors.email}</Text>
                            }



                            <View style={styles.paragraph}>

                                <Image source={require('../../Images/Registartion/vehicle.png')}
                                    style={styles.imageStyle} />
                                <TextInput
                                    value={values.registrationNum}
                                    onChangeText={handleChange('registrationNum')}
                                    onBlur={() => setFieldTouched('registrationNum')}
                                    placeholder="Registration Number"
                               autoCapitalize = {"characters"}
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

                                <Image source={require('../../Images/Registartion/vin_no.png')}
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

                                    <Image source={this.state.termsSelectionBox === false ? require('../../Images/Registartion/check_box.png') : require('../../Images/Registartion/check_Marked.png')}
                                        style={styles.imageStyle} />

                                    <Text style={{ paddingTop: 15 }}> I agree to </Text>

                                </TouchableOpacity>


                                <Text onLongPress={() => this.props.navigation.navigate('termsCondition')} onPress={() => this.props.navigation.navigate('termsCondition')} style={{ paddingTop: 15, color: "black" }}> Terms And Conditions  </Text>
                            </View>



                            <TouchableOpacity
                                // disabled={!isValid}
                                onPress={() => this.onSubmitAction(isValid, values)}
                                // onPress = {() => this.props.navigation.navigate('drivingSchool')}

                                style={{ height: 50, width: 240, backgroundColor: Utilites.ButtonsBGColor, borderRadius: 50 / 2, justifyContent: "center", alignItems: "center", alignSelf: "center" }}  >
                                <Text > SUBMIT </Text>

                            </TouchableOpacity>



                            <Text style={{ padding: 50, alignSelf: "center" }} > SKIP REGISTRATION </Text>


                            <Spinner
                                visible={this.state.isLoading}
                                textContent={"Please Wait"}
                            
                                textStyle={styles.spinnerTextStyle}
                                animation={"fade"}
                                color="#0766ff"
                            />

                        </ScrollView>


                    </Fragment>
                )}
            </Formik>
        );

    }
    // }
}



function mapStateToProps(state) {
    return {

        loading: state.loading,

        products: state.items,

        checkItemSelection:state.checkTermsSection,


        //error:state.error

    };
}

function mapDispatchToProps(dispatch) {
    return {

        loadTask: (item) => dispatch(loadTODOTask(item)),
        checkTerms: (item) => dispatch(checkTermsAndCondition(item)),

    };
}




export default connect(mapStateToProps, mapDispatchToProps)(Registration);


const styles = StyleSheet.create({
    container: {
        flex: 1,

        marginTop: Constant.TopHeaderConstant,

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
    spinnerTextStyle: {
        color: '#0766ff'
    },

});
