

var { StyleSheet } = require('react-native');

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
    },
    Listbox:{
        position: "absolute",
        bottom: 30,
        left: 20, right: 20,
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

});

module.exports = styles;