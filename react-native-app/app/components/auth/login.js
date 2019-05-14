import React, {Component} from 'react';
var { View, Text,Image,ScrollView} = require('react-native');
import {connect} from 'react-redux';
import {login} from '../../actions/auth'; //Import your actions
import styles from '../../styles/index'
import {Authentication} from './index';
import { NavBar  } from '../index';

class Login extends Component {
    render() {
        return (
            <ScrollView style={{flex: 1,paddingHorizontal: 20,}}>
                <Image
                    style={styles.SnakeLayout}
                    source={require('../../../assets/logo.png')}
                />
                <NavBar/>
                <Text style={styles.HeaderTitle}>SNEK THE MUSEUM</Text>
                <Text>Lorem ipsum dolor sit amet, consetetur
                sadipscing elitr, sed diam nonumy eirmod tempor </Text>
                <Authentication login onPress={this.login.bind(this)}/>
                <Text style={{textAlign: "center",marginTop: 30,}}>Nog geen account? Registreer je hier</Text>
            </ScrollView>
        );
    }

    login(data, errorCB) {
        this.props.login(data, errorCB);
    }
};

export default connect(null, {login})(Login);