
import {AsyncStorage} from 'react-native'


const removeItemValue = async(key) =>{
    
    try 
    {
      await AsyncStorage.removeItem(key);
      console.log("Deleted Item " + key)
      return true;
    }

    catch(exception) 
    {
      console.log("Item Not Deleted  " + key)

      return false;
    }

  }


export default removeItemValue