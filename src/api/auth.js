import { AsyncStorage } from 'react-native'


import removeItemValue from '../Storage/removeAsyncData'


import TokenService from '@around25/jwt-utils'
const Token = new TokenService({
  storageSystem: AsyncStorage
});

const login = (credentials) => {
  // Make API call to retrieve an access token
  const tok = 'this_is_a_demo_access_token';
  
  return Token.store(tok);
}

const isLoggedIn = async () => {
  const tok = await Token.get();
  return !!tok
}

const logout = () => 
{

  removeItemValue("CustomerID")
  removeItemValue("LoyaltyEnrolled")
  removeItemValue("DeviceToken")
  removeItemValue("DateFormat")
  removeItemValue("CustomerDetails")
  removeItemValue("AppName")
 
  return Token.remove();
}

export {
  login,
  isLoggedIn,
  logout
}
