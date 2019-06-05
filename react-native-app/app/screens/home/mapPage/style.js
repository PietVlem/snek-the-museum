
var { View, Text, AsyncStorage,Image,TouchableOpacity,FlatList,Animated,Dimensions,StyleSheet,ScrollView } = require('react-native');
var { StyleSheet } = require('react-native');
const width = Dimensions.get('window').width
var styles = StyleSheet.create({

    
    Liststyle:{
        borderBottomWidth: 0,
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "#8386A3",
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 1,
        paddingLeft: 5,
        paddingTop: 5,
        marginLeft: 20,
        marginRight: 20,
    },
    Listbox:{
        backgroundColor: "red"
    },
    subtitle:{
        color: "#A9A9B0",
        fontFamily: 'MontserratLight',
        fontSize: 12,
        fontWeight: "300",
        paddingLeft: 10
    },
    ListItemTitle:{
        color: "#303E48",
        fontFamily: 'MontserratMedium',
        fontSize: 15,
        paddingLeft: 10
    },
    MapMuseaBox:{
        paddingTop: 10,
        paddingBottom: 15,
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    distanceIcon:{
        width: 30,
        resizeMode: "contain",
        height: 30,
        marginRight: 10,
    },
    distanceText:{
        fontSize: 11,
        fontFamily: "MontserratRegular",
        color: '#6FA29B',
        marginTop: 8,
    },
        view: {
          width: width,
        },
});

module.exports = styles;