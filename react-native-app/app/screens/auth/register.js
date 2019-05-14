import React, {Component} from 'react';
var { View, Text,Image,ScrollView,Button,TouchableOpacity} = require('react-native');
import { NavBar  } from '../index';
import {connect} from 'react-redux';
import {register} from '../../actions/auth'; //Import your actions
import {Authentication} from './index';
import { Actions } from 'react-native-router-flux';
import styles from '../../styles/index'
class Register extends Component {

    render() {
        return (
            <ScrollView style={{flex: 1,paddingHorizontal: 20,paddingTop: "15%",}}>
                <NavBar/>
                <Text style={{marginLeft: 15,marginTop: 20,fontSize: 32,fontFamily: 'PTSansBold',color:'#3E4A59'}}>Registreren</Text>
                <Authentication register onPress={this.register.bind(this)}/>
                <TouchableOpacity><Text onPress={Actions.login} style={{textAlign: "center",marginTop: 20,fontSize: 12,padding:10,fontFamily: 'PTSansRegular',color: "#5E646C",}}>Reeds geen account? <Text style={{color: "#6FA29B"}}>Inloggen</Text></Text></TouchableOpacity>
                <Image
                style={styles.SnakeRegister}
                source={require('../../../assets/logo.png')}
                />
            </ScrollView>    
        );
    }

    register(data, errorCB) {
        this.props.register(data, errorCB);
    }
};


export default connect(null, {register})(Register);
