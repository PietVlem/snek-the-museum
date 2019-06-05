

var { StyleSheet } = require('react-native');

var styles = StyleSheet.create({

    container:{
        flex: 1,
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
        right: "-13%",
        bottom: "20%",
        transform: [{ rotate: '-120deg'}]
    }, 
    subTitle:{
        fontFamily: 'PTSansBold',
        fontSize: 15,
        color: "#8D959D",
        textAlign: "center",
        width: '70%',
        alignSelf: 'center',
        marginTop: 30,
    },
    ProgressBarBox:{
        marginTop: 50,
        alignItems: 'center',
    },
    score: {
        fontFamily: 'PTSansBold',
        fontSize: 15,
        color: "#3E4A59",
        textAlign: "center",
        alignSelf: 'center',
        marginTop: 30,
      },
    PointSubTitle:{
        fontFamily: 'PTSansBold',
        fontSize: 13,
        color: "#A9A9B0",
        textAlign: "center",
        alignSelf: 'center',
        marginTop: 30, 
    }
});

module.exports = styles;