import React, {Component} from 'react';
var { View, Text,Image,ScrollView,Button,TouchableOpacity} = require('react-native');
import { SocialIcon } from 'react-native-elements';
import {connect} from 'react-redux';
import {login} from '../../actions/auth'; //Import your actions
import styles from '../../styles/index'
import {Authentication} from './index';
import { NavBar  } from '../index';
import { Actions } from 'react-native-router-flux';

class Login extends Component {
    render() {
        return (
            <ScrollView style={{flex: 1,paddingHorizontal: 20}}>
                <Image
                    style={styles.SnakeLayout}
                    source={require('../../../assets/logo.png')}
                />
                <View style={{paddingTop: "12%"}}><NavBar/></View>
                <Text style={styles.HeaderTitle}>SNEK THE MUSEUM</Text>
                <Text style={styles.Subtitle}>Lorem ipsum dolor sit amet, consetetur
                sadipscing elitr, sed diam nonumy eirmod tempor </Text>
                <Authentication login onPress={this.login.bind(this)}/>
                <SocialIcon
                title='LOGIN MET FACEBOOK'
                button
                type='facebook'
                style={{marginHorizontal: 15,}}
                />
                <TouchableOpacity><Text onPress={Actions.register} style={{padding:10,textAlign: "center",marginTop: 30,fontSize: 12,fontFamily: 'PTSansRegular',color: "#5E646C",}}>Nog geen account? <Text style={{color: "#6FA29B"}}>Registreer je hier</Text></Text></TouchableOpacity>
            </ScrollView>
        );
    }

    login(data, errorCB) {
        this.props.login(data, errorCB);
    }
};

export default connect(null, {login})(Login);