import React, {Component} from 'react';
var { View, Text,Image } = require('react-native');

import {Actions} from 'react-native-router-flux';
import { Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons'

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
                    <Button buttonStyle={styles.buttonArrow} onPress={Actions.login}
                    icon={
                        <Ionicons 
                        name={ "md-arrow-forward"}
                        size={15}
                        color="white"
                        style={{paddingLeft: 20}}
                        />
                    }
                    iconRight
                    title="START"
                    titleStyle={{fontFamily: 'RobotoBold',}}
                    />
                </View>
            </View>
        );
    }
};
