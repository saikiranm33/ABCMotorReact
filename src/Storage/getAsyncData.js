import {AsyncStorage} from 'react-native'


const getDataItem = async (key, callBack) => {
    try {
        const value = await AsyncStorage.getItem(key)
;
        if (value !== null) {
            console.log('Async Value is ' + value);
            callBack(value);
        }
    } catch (error) {
        console.log('Error is' + error.message);

        console.log('Error Unable to get the data' );
    }
}
    export default getDataItem;