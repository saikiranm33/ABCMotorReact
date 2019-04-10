import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';


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

export default class VariantFlatList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {


        return (
            <View style={styles.flatViewStyle}>
                <FlatList
                    data={this.props.myDataList}
                    style={{ backgroundColor: "clear", borderRadius: 5,marginTop:80 }}
                    ItemSeparatorComponent={renderSeparator}
                    showsVerticalScrollIndicator={false}

                    renderItem={({ item, separators, index }) => (
                        <TouchableOpacity style={styles.flatListStyle} onPress={() => this.props.updateList(item)}>



                            <View style={{ flex: 1.3, backgroundColor: "#f7f7f7", borderRadius: 10, justifyContent: "flex-start", height: 100, flexDirection: "row", }}>
                                <View style={{ height: 50, width: 3, backgroundColor: index % 2 == 0 ? "red" : "green", marginLeft: 2, alignSelf: "center" }} />
                                <View style={{ alignSelf: "center" }}>

                                    <Text style={{ paddingLeft: 10, color: "black" }}>
                                        {item.VariantName}
                                    </Text>


                                    <Text style={{ paddingLeft: 10 }}>
                                        {item.TransmissionType},{item.FuelType}
                                    </Text>


                                    <Text style={{ paddingLeft: 10 }}>
                                    {'\u20B9'} {item.ExshowroomPrice}
                                    </Text>

                                </View>


<View style = {{flex:1,justifyContent:"flex-end",flexDirection:"row"}}>
                                  <Image
                                    style={{ width: 20, height: 20, marginRight: 10, alignSelf:"center" }}
                                    source={require('../Images/HomeScreen/arrow.png')}
                                />
</View>


                            </View>




                              



                        </TouchableOpacity>
                    )}
                />

            </View>
        );
    }
}



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
