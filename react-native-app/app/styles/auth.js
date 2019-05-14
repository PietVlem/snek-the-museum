var { StyleSheet } = require('react-native');

var styles = StyleSheet.create({
    wrapper:{
        flex: 1,
        backgroundColor: '#fff'
    },
    container:{
        flex: 1,
        padding: 15
    },

    headerText: {
        fontWeight: "700",
        fontSize: 22,
        marginTop: 5,
        marginBottom: 5,
        color: "rgb(10,39,106)",
    },

    errorText:{
        color:"red",
        marginBottom: 5,
        fontSize: 12,
    },

    inputContainer:{
        borderBottomWidth: .5,
        borderColor: "#EFF0F4",
        marginVertical: 10,
    },
    fieldLabel:{
        color: "#3E4A59"
    },

    textInput: {
        fontSize: 14,
        height: 35,
        fontFamily: 'Helvetica Neue',
        color: "#333333"
    },

    forgotText: {
        fontFamily: "RobotoRegular",
        fontSize: 12,
        marginBottom: 20,
        color: "#6FA29B",
        textAlign: "right",
        marginTop: 5,
    }
});

module.exports = styles;