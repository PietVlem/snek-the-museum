

var { StyleSheet } = require('react-native');

var styles = StyleSheet.create({

    container:{
        flex: 1,
    },
    SnakeLayout:{
        width: 100,
        resizeMode: 'contain',
        height: 100,
        position: "absolute",
        right: "-15%",
        top: "20%",
        transform: [{ rotate: '-120deg'}]
    },  
    SearchIcon:{
        width: 70,
        height: 70,
        resizeMode: 'contain',
        
    },
    SearchBtn:{
        width: 110,
        height: 110,
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
        marginTop: "35%", 
        marginBottom: '35%',
    },
    PushTitle:{
        color: "#3E4A59",
        fontFamily: 'PTSansBold',
        fontSize: 16,
        marginBottom: 10,
        paddingLeft: 20,
        marginTop: 5,
    }, 
    Subtitle:{
        color: "#3E4A59",
        fontFamily: 'MontserratLight',
        fontSize: 12,
        marginBottom: 20,
        marginLeft: 20,
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