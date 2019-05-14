
 

import React, {Component} from 'react';
var { View, Text, AsyncStorage } = require('react-native');

import {connect} from 'react-redux';

import {Actions} from 'react-native-router-flux';

import {setStatus, logout} from '../../../actions/auth'; //Import your actions

import {Button} from '../../index'; //Import your Button

import styles from './style'

class groupScreen extends Component {

    componentDidMount() {
        var _this = this;

        // //Check if token exist
        // AsyncStorage.getItem('token', (err, token) => {
        //     if (token === null) Actions.welcome();
        //     else _this.props.setStatus(true)
        // });
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    <Text>Groep !</Text>
                    // (this.props.loggedIn) &&
                    // <View>
                    //     <Text style={[styles.welcomeText]}>Welcome</Text>
                    //     <Text style={[styles.subText]}>You are logged in.</Text>
                    //     <Button btnText="Logout" onPress={this.props.logout}/>
                    // </View>
                }
            </View>
        );
    }
};


function mapStateToProps(state, props) {
    return {
        loggedIn: state.authReducer.loggedIn
    }
}

export default connect(mapStateToProps, {setStatus, logout})(groupScreen);
