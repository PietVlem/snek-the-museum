

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
    SearchIcon:{
        width: 50,
        height: 50,
        resizeMode: 'contain',
        
    },
    SearchBtn:{
        width: 84,
        height: 84,
        borderRadius: 100,
        backgroundColor: '#E7B164',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#C7D0F8",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
          height: 3,
          width: 0
        }
    },
    SearchIconBox:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30, 
        marginBottom: '20%',
    },
    RecentMuseaTitle:{
        color: "#3E4A59",
        fontFamily: 'PTSansBold',
        fontSize: 16,
        marginBottom: 20,
        paddingLeft: 20,
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

});

module.exports = styles;