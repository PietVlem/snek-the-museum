import React, {Component} from 'react';
var { View, Text, AsyncStorage,TouchableOpacity,Image,Dimensions,Alert } = require('react-native');
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import { NavBar  } from '../../../index';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import {setStatus, logout} from '../../../../actions/auth'; //Import your actions
import {Button} from '../../../index'; //Import your Button
import styles from './style'

class startCheckScreen extends Component {

    state = {
        progress: 5,
        progressWithOnComplete: 0,
        progressCustomized: 0,
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
            <View style={styles.container}>
                <View style={{marginLeft: 20,marginTop: 50,}}></View>
                        <View style={styles.ProgressBarBox}>
                            <ProgressBarAnimated
                            width={barWidth}
                            value={this.state.progress}
                            backgroundColor="#E7B164"
                            backgroundColorOnComplete="#6CC644"
                            borderColor='#8D959D'
                            />
                            <Text style={styles.subTitle}>
                                Om vraag 1 te starten, gelieve een foto
                                van de Qr-code te nemen.
                            </Text>
                            <Animatable.View animation="pulse" iterationCount={1000000000} direction="alternate">    
                            <TouchableOpacity onPress={() => Actions.groupScreen()}>
                                <Image
                                style={styles.SearchIcon}
                                source={require('../../../../../assets/binoculars2.png')}
                                /> 
                            </TouchableOpacity> 
                        </Animatable.View> 
                        </View>
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
            </View>
        );
    }
};


function mapStateToProps(state, props) {
    return {
        loggedIn: state.authReducer.loggedIn
    }
}

export default connect(mapStateToProps, {setStatus, logout})(startCheckScreen);
