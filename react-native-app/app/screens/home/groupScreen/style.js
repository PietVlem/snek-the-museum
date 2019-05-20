

var { StyleSheet } = require('react-native');

var styles = StyleSheet.create({

    container:{
        flex: 1,
    },

    Pushtitle:{
        textAlign: "center",
        marginTop: "7%",
        color: "#3E4A59",
        fontFamily: 'MontserratRegular',
        fontSize: 12,
        marginBottom: 20,
    },
    SnakeLayout:{
        width: 100,
        resizeMode: 'contain',
        height: 100,
        position: "absolute",
        left: "-15%",
        top: "20%",
        transform: [{ rotate: '-310deg'}]
    },  
    Liststyle:{
        marginTop: 10,
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
    },
    Listbox:{
        paddingHorizontal: 20,
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
    ContainerSearchbox:{
        margin: 20,
        borderBottomWidth: 0,
        borderTopWidth: 0,
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
    },
    Input:{
        color:"red",
        backgroundColor: "white",
        width:"100%",
    },
    SearchIcon:{
        width: 25,
        height: 25,
        resizeMode: 'contain',
        justifyContent: 'flex-end',
        marginLeft:40,
        
    },

});

module.exports = styles;