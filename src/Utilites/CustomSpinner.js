import React, { components } from 'react'
import { View,styles} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import Constant from '../Utilites/Constant'


const CustomSpinner = (props) => {
    return (
            <Spinner
            visible={props.isLoading}
            TextInput={"Please Wait"}
            animation={"fade"}
            color = {Constant.LoadingColor}
          />
    )
}


export default CustomSpinner