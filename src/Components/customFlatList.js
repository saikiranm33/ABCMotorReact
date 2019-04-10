import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableHighlight,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';

import FastImage from 'react-native-fast-image'
import Constant from '../Utilites/Constant'


const myDataList = [

    { id: 1, title: "Dizre", subtitle1: "6.7L - 7.5 L", subtitle2: "Available in 1 variants", imagePath: require('../Images/dzire.jpg') },
    { id: 2, title: "Dizre", subtitle1: "6.7L - 7.5 L", subtitle2: "Available in 1 variants", imagePath: require('../Images/dzire.jpg') },
    { id: 3, title: "Dizre", subtitle1: "6.7L - 7.5 L", subtitle2: "Available in 1 variants", imagePath: require('../Images/dzire.jpg') },
    { id: 4, title: "Dizre", subtitle1: "6.7L - 7.5 L", subtitle2: "Available in 1 variants", imagePath: require('../Images/dzire.jpg') },
    { id: 5, title: "Dizre", subtitle1: "6.7L - 7.5 L", subtitle2: "Available in 1 variants", imagePath: require('../Images/dzire.jpg') },

]

const renderSeparator = () => (
    <View
        style={{
            backgroundColor: 'clear',
            height: 5,
            borderRadius: 5,
        }}
    />
);

class CustomFlatList extends React.Component {
    constructor(props) {
        super(props);
        // this.updateMyData = this.updateMyData.bind(this);
        // this.onEndReached =  this.onEndReached.bind(this);
   
    }

    updateMyData(item) {
        this.props.updateTask(item);
    }



    render() {
        console.log("Custom List Data")
        console.log(this.props.DataList)

        return (
            <View style={styles.flatViewStyle}>
                <FlatList
                    data={this.props.DataList}
                    style={{ backgroundColor: "clear", borderRadius: 5, marginTop: 50 }}
                    ItemSeparatorComponent={renderSeparator}
                    showsVerticalScrollIndicator={false}
                    onEndReached={this.props.onEndReached}
                    onEndReachedThreshold={0.1}
                    renderItem={({ item, separators }) => (
                        <TouchableOpacity style={styles.flatListStyle} onPress={() => this.props.updateList(item)}>


                            <View style={{ flex: 1.3, backgroundColor: "white", borderColor: "gray", justifyContent: "center", height: 150, borderBottomLeftRadius: 5, borderTopLeftRadius: 5 }}>

                                <FastImage
                                    style={{ width: 120, height: 120, alignSelf: "center" }}
                                    source={{
                                        uri: Constant.ImageURL + "/" + item.ImageURL
                                    }}
                                    resizeMode={FastImage.resizeMode.contain}
                                    placeholderColor="red"
                                />

                            </View>

                            <View style={{ flex: 1.3, backgroundColor: "#f7f7f7", borderBottomRightRadius: 5, borderTopRightRadius: 5, justifyContent: "center" }}>

                                <Text style={{ paddingLeft: 15, color: "black",margin:5,fontSize:16 }}>
                                    {item.ModelName}
                                </Text>

                                <Text style={{ paddingLeft: 15 ,margin:5}}>
                                {'\u20B9'} {item.Pricerange}
                                </Text>


                                <Text style={{ paddingLeft: 15, color: "red" ,margin:5,fontSize:11}}>
                                    Available in {item.NoofVarient} Variants
                                </Text>
                            </View>








                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
}

export default CustomFlatList;

const styles = StyleSheet.create({
    flatViewStyle: {

        flex: 1,
        height: 250,
        borderRadius: 10,
        margin: 20,

    },

    flatListStyle: {

        flexDirection: 'row',
        flex: 1,


    },

    flatTitleStyle: {
        flex: 3,
        color: 'white',
        alignItems: 'center',
        paddingLeft: 20,
    },

    textStyles: {
        flex: 1,
    },

    imageStyle: {
        width: 25,
        height: 25,
    },
});
