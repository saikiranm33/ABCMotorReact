import React, { Component } from 'react'
import { View, ActivityIndicator, StyleSheet, StatusBar, AsyncStorage } from 'react-native'
import axios from 'axios'
import { NavigationActions } from 'react-navigation'
import Constant from '../../Utilites/Constant'
import store from '../store';
import { auth } from 'react-native-firebase';
import getDataItem from '../../Storage/getAsyncData'

export const FETCH_PRODUCTS_BEGIN = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

let registerUserInfo = []


const fetchProductsBegin = () => ({
    type: FETCH_PRODUCTS_BEGIN
});

const fetchProductsSuccess = (item) => (

    {

        type: FETCH_PRODUCTS_SUCCESS,
        payload: item,
    });

const fetchProductsFailure = error => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: { error }
});


const checkTermsAndCondition = (item) => ({


    type: "CheckTermsAndCondition",
    payload: item

})




const CheckVersionUpdate = (item) => {


    console.log("CheckVersionUpdate")

    console.log(item[0].AppName)


    return (dispatch, getState) => {


    //    dispatch(fetchProductsBegin({ type: 'FETCH_PRODUCTS_BEGIN' }));

        axios.get(Constant.ServiceURL + 'CheckForVersion' + "/" + item[0].AppName + "/" + item[0].Version)
            .then(function (response) {
                // handle success

                console.log(response);
                dispatch({ type: 'CheckAppVersion', payload: response.data })
                dispatch(fetchProductsSuccess(response.data));
            })
            .catch(error => dispatch(fetchProductsFailure(error)))
            .then(function () {
                // always executed
            });



    }
}


const loadTODOTask = (item) => {



    // console.log("loadTODOTask")
    // console.log(item[0])
    // console.log(item[1][0])


    let bodyFormData = 
    {
        "ContactNumber"  : item[0].mobilenumber,
        "CustomerName"   : item[0].name,
        "Email"  : item[0].email,
        "VehicleRegistrationNumber"  : item[0].registrationNum,
        "VinNumber"  :item[0].VinNum,
        "Version" : item[1][0].Version,
        "DeviceId":item[1][0].DeviceToken,
        "CustomerAppType" : "I"

    }


    // let bodyFormData =
    // {
    //     "ContactNumber": "8639913581",
    //     "CustomerName": "SAIkiRAN",
    //     "Email": "saikiranm33@gmail.com",
    //     "VehicleRegistrationNumber": "RT09YT0909",
    //     "VinNumber": "",
    //     "Version": "12344",
    //     "DeviceId": "ewewewewewewewrejoejgogjjrojgojrgjrgrgrgrgrgrgrg",
    //     // "CustomerAppType" : "IA"

    // }



    console.log("Called Load Task")

    return (dispatch, getState) => {

       dispatch(fetchProductsBegin({ type: 'FETCH_PRODUCTS_BEGIN' }));


        axios({
            method: 'post',
            url: Constant.ServiceURL + 'RegisterCustomers',
            data: bodyFormData,

        })
            .then(function (response) {

                console.log(response);

                if (response.data.Status.StatusCode == 2)
                {
                    AsyncStorage.setItem('UserInformation', bodyFormData);
                }

    
                dispatch(fetchProductsSuccess(response.data));

            })
            .catch(error => dispatch(fetchProductsFailure(error)))
            .then(function () {
                // always executed
            });

    }
}


const GetCity = (item) => {



    console.log("Called Get City")



    let itemList = {

        "DeviceId": "hjgsdsgdisgdigsidgsidgisdgigsd-jsgdsgdsdgs-sdkshdkshdkshd",
        "CustomerId": "-1",
        "Version": "1.0",

    }



    return (dispatch, getState) => {


   


        axios({
            method: 'post',
            url: Constant.ServiceURL + 'GetCustCities',
            data: itemList,

        })
            .then(function (response) {

                console.log(response);



                if (response.data.Status.StatusCode == 2) {


                    let itemArr = ["Select City"]

                    response.data.Data.map((todo) => {

                        itemArr.push(todo.CityName)

                        console.log(itemArr)

                    });

                    //dispatch(fetchProductsSuccess(itemArr));

                    dispatch({ type: 'GetCity', payload: itemArr })


                }
                else {

                    let itemArr = ["Select City"]

                    dispatch({ type: 'GetCity', payload: itemArr })


                }



            })
            .catch(error => dispatch(fetchProductsFailure(error)))
            .then(function () {
                // always executed
            });

    }
}
const GetModel = (item) => {



    console.log("Called Get City")

    

    let itemList = {

        "DeviceId": "hjgsdsgdisgdigsidgsidgisdgigsd-jsgdsgdsdgs-sdkshdkshdkshd",
        "CustomerId": "-1",
        "Version": "1.0",
        "BrandId":item

    }

   

    return (dispatch, getState) => {



        axios({
            method: 'post',
            url: Constant.ServiceURL + 'GetModelsByBrand',
            data: itemList,

        })
            .then(function (response) {

                console.log(response);


                let totalItem = []

                if (response.data.Status.StatusCode == 2) {



                

                    let itemArr = ["Select Model"]

                    let itemModelId = []

                    response.data.Data.map((todo) => {

                        itemArr.push(todo.Name)
                        itemModelId.push(todo.Id)

                       

                    });
                    console.log(itemArr)
                    totalItem.push(itemArr)
                    totalItem.push(itemModelId)
                    //dispatch(fetchProductsSuccess(itemArr));

                    dispatch({ type: 'GetModel', payload: totalItem })


                }
                else {

                    let itemArr = ["Select Model"]
                    let itemModelId = []
             
                    totalItem.push(itemArr)
                    totalItem.push(itemModelId)



                    dispatch({ type: 'GetModel', payload: totalItem })


                }



            })
            .catch(error => dispatch(fetchProductsFailure(error)))
            .then(function () {
                // always executed
            });

    }
}
const GetBrand = (item) => {



    console.log("Called Get GetBrands")



    let itemList = {

        "DeviceId": "hjgsdsgdisgdigsidgsidgisdgigsd-jsgdsgdsdgs-sdkshdkshdkshd",
        "CustomerId": "-1",
        "Version": "1.0",

    }



    return (dispatch, getState) => {


    


        axios({
            method: 'post',
            url: Constant.ServiceURL + 'GetCustBrands',
            data: itemList,

        })
            .then(function (response) {

                console.log(response);



                if (response.data.Status.StatusCode == 2) {


                    let itemArr = ["Select Brand"]

                 

                    response.data.Data.map((todo) => {

                        itemArr.push(todo.Brand1)

                    

                    });
                    console.log(itemArr)
                    //dispatch(fetchProductsSuccess(itemArr));

                    dispatch({ type: 'GetBrands', payload: itemArr,itemArr })


                }
                else {

                    let itemArr = ["Select Brand"]

                    dispatch({ type: 'GetBrands', payload: itemArr })


                }



            })
            .catch(error => dispatch(fetchProductsFailure(error)))
            .then(function () {
                // always executed
            });

    }
}

const GetBranch = (item) => {



    console.log("Called Get Branch")



    let itemList = {

        "DeviceId": "hjgsdsgdisgdigsidgsidgisdgigsd-jsgdsgdsdgs-sdkshdkshdkshd",
        "CustomerId": "-1",
        "Version": "1.0",
        "CityId":item,
        "BranchType":"service",

    }



    return (dispatch, getState) => {


  


        axios({
            method: 'post',
            url: Constant.ServiceURL + 'GetBranchesByCities',
            data: itemList,

        })
            .then(function (response) {

                console.log(response);



                if (response.data.Status.StatusCode == 2) 
                {


                    let itemArr = ["Select Branch"]

                    response.data.Data.map((todo) => {

                        itemArr.push(todo.Name)

                        console.log(itemArr)

                    });

                    //dispatch(fetchProductsSuccess(itemArr));

                    dispatch({ type: 'GetBranch', payload: itemArr })


                }
                else {

                    let itemArr = ["Select Branch"]

                    dispatch({ type: 'GetBranch', payload: itemArr })


                }



            })
            .catch(error => dispatch(fetchProductsFailure(error)))
            .then(function () {
                // always executed
            });

    }
}





const RegisterCustWithNoVehicle = (requiredInfo) => {


    

    console.log("Called Get RegisterCustWithNoVehicle")

    console.log(registerUserInfo)

  
 
        

       
  
        let itemList = {

            "ContactNumber":item[0].mobilenumber,
            "CustType":"",
            "CustomerAppType":"Andriod",
            "CustomerName":item[0].name,
            "DeviceId":item[1][0].DeviceToken,
            "Email":item[0].email,
            "Make":"String content",
            "Model":"String content",
            "PreferredBranchId":"String content",
            "VehicleRegistrationNumber":item[0].registrationNum,
            "Version": "1.1.2",
            "VinNumber":"",
    
        }

    return (dispatch, getState) => {


      


        axios({
            method: 'post',
            url: Constant.ServiceURL + 'RegisterCustWithNonTridentVehicle',
            data: itemList,

        })
            .then(function (response) 
            {

                console.log(response);


                // if (response.data.Status.StatusCode == 2) 
                // {

                //   //  dispatch({ type: 'RegisterCustWithNovehicle', payload: response.data })

                // }
                // else 
                // {
                //  //   dispatch({ type: 'RegisterCustWithNovehicle', payload: []})

                // }

            })
           // .catch(error => dispatch(fetchProductsFailure(error)))
            .then(function () {
                // always executed
            });

    }


}

export { loadTODOTask, CheckVersionUpdate, fetchProductsBegin, fetchProductsSuccess, fetchProductsFailure, GetCity ,GetModel,GetBrand,GetBranch,RegisterCustWithNoVehicle,checkTermsAndCondition} 
