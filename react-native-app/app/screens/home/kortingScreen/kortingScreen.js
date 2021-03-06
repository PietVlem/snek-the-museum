import React, {Component} from 'react';
var { View, Text, AsyncStorage,TouchableOpacity,Image } = require('react-native');
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import QRCode from 'react-native-qrcode';
import { NavBar  } from '../../index';
import {setStatus, logout} from '../../../actions/auth'; //Import your actions
import {Button} from '../../index'; //Import your Button
import styles from './style'

class kortingScreen extends Component {

    state = {
        text: this.props.promocode,
    };
    
    render() {
        return (
            <View style={styles.container}>
                <View style={{marginLeft: 20,marginTop: 50,}}></View>
                    <Text style={styles.discountTitle}>Kortingscode</Text>
                        <Text style={styles.discountSubTitle}>
                            Deze kortingscode is enkel toegankelijk voor 
                            <Text style={{fontFamily: 'MontserratMedium',}}> {this.props.slug}</Text>
                        </Text>
                        <View style={{alignItems: 'center',}}>
                            <View style={styles.Codeprint}>
                                <QRCode
                                value={this.state.text}
                                size={180}
                                bgColor='#3E4A59'
                                fgColor='white'/>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => Actions.startScreen()} style={styles.btnContainer}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>
                                     VOORSTELLING BETREDEN
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <Image
                            style={styles.SnakeLayout}
                            source={require('../../../../assets/logo.png')}
                        />
            </View>
        );
    }
};


function mapStateToProps(state, props) {
    return {
        loggedIn: state.authReducer.loggedIn
    }
}

export default connect(mapStateToProps, {setStatus, logout})(kortingScreen);
