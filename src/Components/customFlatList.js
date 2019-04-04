import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableHighlight,
    Image,
    TouchableOpacity
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
        borderRadius:5,
      }}
    />
  );

class CustomFlatList extends React.Component {
    constructor(props) {
        super(props);
        this.updateMyData = this.updateMyData.bind(this);

    }

    updateMyData(item) {
        this.props.updateTask(item);
      }

    render() {


        return (
            <View style={styles.flatViewStyle}>
                <FlatList
                    data={myDataList}
                    style={{ backgroundColor: "clear",borderRadius:5 ,marginTop:50}}
                    ItemSeparatorComponent={renderSeparator}
                    showsVerticalScrollIndicator={false}
       
                    renderItem={({ item, separators }) => (
                        <TouchableOpacity  style={styles.flatListStyle}  onPress={() => this.props.updateList(item)}>
                        

                            <View style={{ flex: 1.3, backgroundColor: "white", borderColor: "gray" ,justifyContent:"center",height:150,borderBottomLeftRadius:5 ,borderTopLeftRadius:5}}>



                                <Image source={item.imagePath} style={{ width: 120, height: 120 ,alignSelf:"center"}} />

                            </View>

                            <View style={{ flex: 1.3, backgroundColor: "#f7f7f7", borderBottomRightRadius:5 ,borderTopRightRadius:5,justifyContent:"center"}}>


                                <Text style={{ paddingLeft: 10,color:"black"}}>
                                    {item.title}
                                </Text>


                                <Text style={{ paddingLeft: 10 }}>
                                    {item.subtitle1}
                                </Text>


                                <Text style={{ paddingLeft: 10 }}>
                                    {item.subtitle2}
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
