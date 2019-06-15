

var { StyleSheet } = require('react-native');

var styles = StyleSheet.create({

    container:{
        flex: 1,
    },
    DetailTitle:{
        color: "#303E48",
        fontFamily: 'PTSansBold',
        fontSize: 21,
        marginBottom: 20,
        paddingLeft: 30,
    },
    button:{
        height: 52,
        marginTop: 40,
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
    HeaderImg:{
        width: '100%', 
        height: 200,
        marginBottom: 30,
    },
    DetailText:{
        textAlign: "left",
        marginLeft: 30,
        marginRight: 30,
        color: "#3E4A59",
        fontFamily: 'PTSansRegular',
        fontSize: 15,
        marginBottom: 20,
    },
    Liststyle:{
        marginTop: 10,
        marginLeft:10,
        backgroundColor:"white",
        borderBottomWidth: 0,
        elevation: 1,
    },
    Infobox:{
        paddingHorizontal: 10,
    },
    galleryBox:{
        marginVertical: 30,
    },
    galleryTitle:{
        marginLeft: 30,
        marginTop: 10,
        fontFamily: 'PTSansBold',
        fontSize: 15,
        color: "#3E4A59",
    },
    exhibitionTitle:{
        marginLeft: 30,
        marginTop: 20,
        fontFamily: 'PTSansBold',
        fontSize: 15,
        color: "#3E4A59",
    },
    reactionBox:{
        marginVertical: 30,
    },
    reactionTitle:{
        marginLeft: 20,
        marginTop: 10,
        fontFamily: 'PTSansBold',
        fontSize: 18,
        color: "#3E4A59",
    },
    reactionstyle:{
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
        paddingTop: 5,
        paddingBottom: 15,

    },
    reactionBoxList:{
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    reactionName:{
        color: "#6FA29B",
        fontFamily: 'PTSansBold',
        fontSize: 15,
        marginBottom: 5,
        marginTop: 10,
        paddingLeft: 10,
    },
    reactionSubTitle:{
        color: "#303E48",
        fontFamily: 'PTSansRegular',
        fontSize: 14,
        paddingLeft: 10,
    },
    reactionBody:{
        color: '#B6BEC7',
        paddingLeft: 75,
        marginTop: 10,
        paddingBottom: 10,
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
        paddingTop: 20,
        paddingBottom: 20,
    },
    Listbox:{
        paddingHorizontal: 20,
        paddingBottom: 20,
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