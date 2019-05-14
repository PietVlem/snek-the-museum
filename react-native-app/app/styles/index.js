

 

var { StyleSheet } = require('react-native');

var styles = StyleSheet.create({

    container:{
        flex: 1,
        justifyContent:"center",
    },
    SnakeLayout:{
        width: 200,
        resizeMode: 'contain',
        height: 200,
        position: "absolute",
        right: "-40%",
        top: "10%",
        transform: [{ rotate: '230deg'}]
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
    buttonArrow:{
        height: 52,
        backgroundColor: '#E7B164',
        justifyContent: "center",
        alignSelf: 'center',
        borderRadius:50,
        width: '50%',
        shadowColor: "#C7D0F8",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
          height: 3,
          width: 0
        },
    },
    button:{
        height: 52,
        marginTop: 10,
        backgroundColor: '#E7B164',
        justifyContent: "center",
        alignSelf: 'center',
        borderRadius:50,
        width: '100%',
        shadowColor: "#C7D0F8",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
          height: 3,
          width: 0
        }
    },

    buttonText:{
        fontFamily: 'PTSansBold',
        fontSize: 16,
        color: "#fff",
        textAlign: "center"
    },
    mainColor:{
        color:"rgb(83,182,249)",
    },

    ///////////////////////////////////////////// LOGIN

    HeaderTitle:{
        fontSize: 50,
        color: '#3E4A59',
        fontFamily: "impact",
        marginTop: "20%",
        marginLeft: 13,
        marginRight: '30%',
    },
    Subtitle:{
        marginTop: 20,
        marginLeft: 15,
        paddingRight: 40,
        fontSize: 12,
        color:'#5E646C',
        fontFamily: "PTSansRegular"
    },

    /////////////////////////////////////////// REGISTER

    SnakeRegister:{
        width: 100,
        resizeMode: 'contain',
        height: 100,
        position: "absolute",
        right: "-20%",
        bottom: "-5%",
        transform: [{ rotate: '230deg'}]
    },


    //////////////////////////////////// PASSWORD FORGOT

    SnakeRecover:{
        width: 100,
        resizeMode: 'contain',
        height: 100,
        position: "absolute",
        right: "-20%",
        bottom: "-50%",
        transform: [{ rotate: '230deg'}] 
    }

});

module.exports = styles;