

var { StyleSheet } = require('react-native');

var styles = StyleSheet.create({

    container:{
        flex: 1,
    },
    DetailTitle:{
        color: "#3E4A59",
        fontFamily: 'PTSansBold',
        fontSize: 28,
        marginBottom: 20,
        paddingLeft: 20,
    },
    HeaderImg:{
        width: '100%', 
        height: 200,
        
    },
    CallToAction:{
        margin:40,
        padding:20,
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
    DetailText:{
        textAlign: "left",
        marginLeft: 40,
        marginRight: 40,
        color: "#3E4A59",
        fontFamily: 'MontserratRegular',
        fontSize: 16,
        marginBottom: 20,
    },
    Liststyle:{
        marginTop: 10,
        marginLeft:20,
        backgroundColor:"white",
        borderBottomWidth: 0,
        backgroundColor: "white",
        elevation: 1,
    },
    Infobox:{
        paddingHorizontal: 20,
    },
    
});

module.exports = styles;