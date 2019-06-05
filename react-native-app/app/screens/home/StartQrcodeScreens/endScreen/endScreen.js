import React, {Component} from 'react';
var { View, Text, AsyncStorage,TouchableOpacity,Image,Dimensions,Alert,ScrollView } = require('react-native');
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import { NavBar  } from '../../../index';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import {setStatus, logout} from '../../../../actions/auth'; //Import your actions
import {Button} from '../../../index'; //Import your Button
import styles from './style'
import QRCode from 'react-native-qrcode';

class endScreen extends Component {

    state = {
        progress: 5,
        progressWithOnComplete: 0,
        progressCustomized: 0,
        text: 'http://facebook.github.io/react-native/',
      }
     
      increase = (key, value) => {
        this.setState({
          [key]: this.state[key] + value,
        });
      }
    

    componentDidMount() {
        var _this = this;

        // //Check if token exist
        // AsyncStorage.getItem('token', (err, token) => {
        //     if (token === null) Actions.welcome();
        //     else _this.props.setStatus(true)
        // });
    }

    render() {
        const barWidth = Dimensions.get('screen').width - 70;
        return (
            <ScrollView style={styles.container}>
                <View style={{marginLeft: 20,marginTop: 50,}}><NavBar/></View>
                        <View style={styles.ProgressBarBox}>
                            <ProgressBarAnimated
                            width={barWidth}
                            value={this.state.progress}
                            backgroundColor="#E7B164"
                            backgroundColorOnComplete="#6CC644"
                            borderColor='#8D959D'
                            />
                            <View>
                                <Text style={styles.HeadTitle}>
                                    Het avontuur zit er op !
                                </Text>
                                <Text style={styles.bodyTitle}>
                                    Je hebt het avontuur tot een goed einde gebracht!
                                    Als beloning krijg je nog een
                                </Text>    
                                <Text style={styles.PriceBox}>
                                    gratis drankje aangeboden in de bar
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
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => Actions.spinPage()} style={styles.btnContainer}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>
                                    BEËINDIGEN
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <Image
                            style={styles.SnakeLayout}
                            source={require('../../../../../assets/logo.png')}
                        />
                {
                    // (this.props.loggedIn) &&
                    // <View>
                    //     <Text style={[styles.welcomeText]}>Welcome</Text>
                    //     <Text style={[styles.subText]}>You are logged in.</Text>
                    //     <Button btnText="Logout" onPress={this.props.logout}/>
                    // </View>
                }
            </ScrollView>
        );
    }
};


function mapStateToProps(state, props) {
    return {
        loggedIn: state.authReducer.loggedIn
    }
}

export default connect(mapStateToProps, {setStatus, logout})(endScreen);
