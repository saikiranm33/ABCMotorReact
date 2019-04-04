import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image, StatusBar } from 'react-native';
import ColorUtilites from '../Utilites/utilites';
import { HeaderBackButton, NavigationActions } from 'react-navigation';



export default class Header extends React.Component {
    constructor(props) {

        super(props)
    }


    render() {


        return (


            <View style={styles.header}>


                <View style={styles.oval} />

                <View style={{ flex:1, position: "absolute", flexDirection: "row", top: 10, left: 0, right: 0 }}>

                    <StatusBar backgroundColor= {ColorUtilites.BackgroundColor} barStyle="light-content" />



                    {this.props.leftButton == true     ?

<TouchableOpacity style={styles.containerMainView} onPress={() => this.props.navigation.goBack(null)}  >
<Image source={require('../Images/backArrow.png')} style={styles.imageStyle2} />
</TouchableOpacity>
                    
                
                    :  <View style={styles.containerMainView}></View>   }


                    <View style={{}}>

                        <Text style={styles.headertext}>{this.props.title}</Text>
                    </View>


                    <View style={styles.containerMainView}>

                        <Text style={styles.headertext}>{this.props.title2}</Text>
                    </View>

                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({


    header: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 0,

    },
    oval: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
        borderRadius: Dimensions.get('window').width /2,
        backgroundColor: ColorUtilites.BackgroundColor,
        top: -Dimensions.get('window').width + 90,

        transform: [
            { scaleX: 1.70 }
        ],

        position: "absolute",



    },
    containerView: {

        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: ColorUtilites.BackgroundColor,

    

    },
    containerMainView: {

        flex: 2,
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: ColorUtilites.BackgroundColor,
    },
    headertext: {
        fontSize: 18,
        color: 'white',
        alignSelf: "center",
        justifyContent: "center",
        textAlign: "left",
        flex: 1,
        marginLeft: 10 ,
        marginTop: 2,
        

    },
    imageStyle2: {

        width: 20,
        height: 20,
        marginLeft: 10,
        alignSelf: "center",
    }


});
