

import logout from '../api/auth'



const onLogOut  = async(props) =>
{
 await logout();
 this.props.navigation.navigate('LoggedOut');

}


export default onLogOut