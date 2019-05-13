

'use strict';

var { StyleSheet } = require('react-native');

var styles = StyleSheet.create({

    container:{
        flex: 1,
        justifyContent:"center",
    },
    imageWelcome:{
        width: 120,
        height: 120,
        alignSelf: 'center',
        marginBottom: '30%',
        resizeMode: 'contain'
    },
    WelcomeBox:{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: "25%"
    },
    welcomeText:{
        fontWeight: "700",
        fontSize: 22,
        marginTop: 5,
        color:"rgb(10,39,106)",
        textAlign: "center"
    },
    btnContainer:{
        borderRadius: 50,
        marginTop: 10,
    },

    button:{
        height: 44,
        backgroundColor: '#E7B164',
        justifyContent: "center",
        alignSelf: 'center',
        borderRadius:50,
        width: '60%',
        shadowColor: "#C7D0F8",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
          height: 3,
          width: 0
        }
    },

    buttonText:{
        fontFamily: 'RobotoBold',
        fontSize: 16,
        color: "#fff",
        textAlign: "center"
    },
    mainColor:{
        color:"rgb(83,182,249)",
    }
});

module.exports = styles;