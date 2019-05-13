'use strict';

import React, {Component} from 'react';
var { View, Text,Image } = require('react-native');

import {Actions} from 'react-native-router-flux';

import {Button} from '../index';

import styles from '../../styles/index'


export default class Welcome extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.WelcomeBox}>
                    <View style={[styles.welcomeText]}>
                        <Image
                            style={styles.imageWelcome}
                            source={require('../../../assets/logo.png')}
                        />
                    </View>
                    <Button onPress={Actions.login} btnText={"START"}/>
                </View>
            </View>
        );
    }
};
