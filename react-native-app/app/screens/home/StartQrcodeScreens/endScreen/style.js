

var { StyleSheet } = require('react-native');

var styles = StyleSheet.create({

    container:{
        flex: 1,
    },
    button:{
        height: 52,
        marginTop: 60,
        backgroundColor: '#E7B164',
        justifyContent: "center",
        alignSelf: 'center',
        borderRadius:50,
        width: '70%',
        shadowColor: "#C7D0F8",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
          height: 3,
          width: 0
        },
        marginBottom: 40,
    },
    buttonText:{
        fontFamily: 'PTSansBold',
        fontSize: 16,
        color: "#fff",
        textAlign: "center"
    },
    SearchIcon:{
        width: 50,
        height: 50,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 50
    },
    SnakeLayout:{
        width: 100,
        resizeMode: 'contain',
        height: 100,
        position: "absolute",
        right: "-17%",
        bottom: "10%",
        transform: [{ rotate: '-150deg'}]
    }, 
    HeadTitle:{
        fontFamily: 'PTSansBold',
        fontSize: 17,
        color: "#3E4A59",
        textAlign: "center",
        width: '70%',
        alignSelf: 'center',
        marginTop: 20,
    },
    ProgressBarBox:{
        marginTop: 50,
        alignItems: 'center',
    },
    bodyTitle:{
        fontFamily: 'MontserratLight',
        fontSize: 12,
        color: "#A9A9B0",
        textAlign: "center",
        paddingHorizontal: 30,
        alignSelf: 'center',
        marginTop: 20,
    },
    PriceBox:{
        fontFamily: 'PTSansBold',
        fontSize: 15,
        color: "#6FA29B",
        textAlign: "center",
        paddingHorizontal: 30,
        alignSelf: 'center',
        marginTop: 30,
    },
    Codeprint:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        shadowColor: "#8386A3",
        shadowOffset: {
            width: 6,
            height: 10,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        width: 200,
        height: 200,
        elevation: 5,
        backgroundColor: "white"
    },

});

module.exports = styles;