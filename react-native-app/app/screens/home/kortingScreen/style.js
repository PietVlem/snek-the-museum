

var { StyleSheet } = require('react-native');

var styles = StyleSheet.create({

    container:{
        flex: 1,
    },
    discountTitle:{
        color: "#3E4A59",
        fontFamily: 'PTSansBold',
        fontSize: 19,
        marginBottom: 10,
        paddingLeft: 35,
        marginTop: 10,
    },
    discountSubTitle:{
        color: "#B6BEC7",
        fontFamily: 'MontserratLight',
        fontSize: 12,
        marginBottom: 10,
        paddingLeft: 35,
        marginTop: 10,
        width: '80%'
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
    button:{
        height: 52,
        marginTop: 50,
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
    SnakeLayout:{
        width: 100,
        resizeMode: 'contain',
        height: 100,
        position: "absolute",
        right: "-13%",
        bottom: "10%",
        transform: [{ rotate: '-120deg'}]
    },  

});

module.exports = styles;