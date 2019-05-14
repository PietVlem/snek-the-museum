import React, {Component} from 'react';
var { View, Text,Image,ScrollView,Button,TouchableOpacity} = require('react-native');
import { NavBar  } from '../index';
import {connect} from 'react-redux';
import {recover} from '../../actions/auth'; //Import your actions
import styles from '../../styles/index'
import {Authentication} from './index';

class Login extends Component {
    render() {
        return (

            <ScrollView style={{flex: 1,paddingHorizontal: 20,paddingTop: "15%",}}>
                <NavBar/>
                <Text style={{marginLeft: 15,marginTop: 20,fontSize: 25,fontFamily: 'PTSansBold',color:'#3E4A59'}}>Paswoord vergeten?</Text>
                <Authentication recover onPress={this.recover.bind(this)}/>
                <Image
                style={styles.SnakeRecover}
                source={require('../../../assets/logo.png')}
                />
            </ScrollView>  
        );
    }

    recover(data, errorCB) {
        this.props.recover(data, errorCB);
    }
};

export default connect(null, {recover})(Login);