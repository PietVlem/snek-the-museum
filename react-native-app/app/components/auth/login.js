
'use strict';

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
            <ScrollView>
                <NavBar/>
                <Text style={styles.HeaderTitle}>SNEK THE MUSEUM</Text>
                <Authentication login onPress={this.login.bind(this)}/>
            </ScrollView>
        );
    }

    login(data, errorCB) {
        this.props.login(data, errorCB);
    }
};

export default connect(null, {login})(Login);