import React, {Component} from 'react';
var { View, Text, AsyncStorage,TouchableOpacity,Image,Dimensions,Alert,ScrollView } = require('react-native');
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import {setStatus, logout} from '../../../../actions/auth'; //Import your actions
import {Button} from '../../../index'; //Import your Button
import Question  from '../../../../components/Question'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style'

class startScreen extends Component {

    componentDidMount() {
        var _this = this;

        // //Check if token exist
        // AsyncStorage.getItem('token', (err, token) => {
        //     if (token === null) Actions.welcome();
        //     else _this.props.setStatus(true)
        // });
    }

    increase = (key, value) => {
        this.setState({
          [key]: this.state[key] + value,
        });
        Actions.startCheckScreen()
    }

    constructor(props){
        super(props)
        this.state = {
          quizFinish : false,
          score: 0,
          progress: 5,
          progressWithOnComplete: 0,
          progressCustomized: 0,
        }
      }
      _quizFinish(score){    
        this.setState({ quizFinish: true, score : score })
      }
      _scoreMessage(score){
        if(score === 20){
          return (<View style={styles.innerContainer} >
                    <TouchableOpacity style={styles.SearchBtn}>
                        <Image
                            style={styles.SearchIcon}
                            source={require('../../../../../assets/binoculars2.png')}
                        /> 
                    </TouchableOpacity>
                    <Text style={styles.score}>Goed geantwoord!</Text>
                    <Text style={styles.PointSubTitle}>Je krijgt 10% extra punten op je slang.</Text>
                    <TouchableOpacity style={styles.btnContainer}>
                            <View style={styles.button}>
                                <Text onPress={this.increase.bind(this, 'progress', 20)} style={styles.buttonText}>
                                     VERDER ZOEKEN
                                </Text>
                            </View>
                    </TouchableOpacity>
                  </View>)
        }
        else if(score === 0){
            return (<View style={styles.innerContainer} >
                    <TouchableOpacity style={styles.SearchBtn}>
                        <Image
                            style={styles.SearchIcon}
                            source={require('../../../../../assets/binoculars2.png')}
                        /> 
                    </TouchableOpacity> 
                      <Text style={styles.score}>Helaas, dit is het foute antwoord!</Text>
                      <TouchableOpacity onPress={() => Actions.startCheckScreen()} style={styles.btnContainer}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>
                                    VERDER ZOEKEN
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>)
        }
    }

    render() {
        const barWidth = Dimensions.get('screen').width - 70;
        return (
            <ScrollView style={styles.container}>
                <View style={{marginLeft: 20,marginTop: 50,}}></View>
                        <View style={styles.ProgressBarBox}>
                            <ProgressBarAnimated
                            width={barWidth}
                            value={this.state.progress}
                            backgroundColor="#E7B164"
                            backgroundColorOnComplete="#6CC644"
                            borderColor='#8D959D'
                            />
                            <View>
                             { this.state.quizFinish ? <View style={styles.container}>
                                 <View style={styles.circle}>
                       
                                   { this._scoreMessage(this.state.score) }
                                 </View>
                       
                             </View> :  <Question quizFinish={(score) => this._quizFinish(score)} /> }
                       
                            </View>
                            
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
            </ScrollView>
        );
    }
};


function mapStateToProps(state, props) {
    return {
        loggedIn: state.authReducer.loggedIn
    }
}

export default connect(mapStateToProps, {setStatus, logout})(startScreen);
