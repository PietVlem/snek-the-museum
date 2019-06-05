import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animbutton from './Animbutton'
const { width, height } = Dimensions.get('window')
let arrnew = []
const jsonData = {"quiz" : {
  "quiz1" : {
    "question1" : {
      "correctoption" : "option3",
      "options" : {
        "option1" : "Java",
        "option2" : "PHP",
        "option3" : "Design Museum",
        "option4" : "IOS"
      },
      "question" : "Wat is de naam van het Museum?"
    },
  }
}
}
export default class Question extends Component {
  constructor(props){
    super(props);
    this.qno = 0
    this.score = 0
 
    const jdata = jsonData.quiz.quiz1
    arrnew = Object.keys(jdata).map( function(k) { return jdata[k] });
    this.state = {
      question : arrnew[this.qno].question,
      options : arrnew[this.qno].options,
      correctoption : arrnew[this.qno].correctoption,
      countCheck : 0
    }
 
  }
  next(){
    if(this.qno < arrnew.length-1){
      this.qno++
 
      this.setState({ countCheck: 0, question: arrnew[this.qno].question, options: arrnew[this.qno].options, correctoption : arrnew[this.qno].correctoption})
    }else{
      
      this.props.quizFinish(this.score*100/5)
     }
  }
  _answer(status,ans){

    if(status == true){
        const count = this.state.countCheck + 1
        this.setState({ countCheck: count })
        if(ans == this.state.correctoption ){
          this.score += 1
        }
        this.next()
      }else{
        const count = this.state.countCheck - 1
        this.setState({ countCheck: count })
        if(this.state.countCheck < 1 || ans == this.state.correctoption){
        this.score -= 1
        this.next()
       }
      }
 
  }
  render() {
    let _this = this
    const currentOptions = this.state.options
    const options = Object.keys(currentOptions).map( function(k) {
      return (  <View key={k} style={{margin:10}}>
        <TouchableOpacity style={styles.Optionbox}>
          <Animbutton countCheck={_this.state.countCheck} onColor={"#E7B164"} effect={"tada"} _onPress={(status) => _this._answer(status,k)} text={currentOptions[k]} />
        </TouchableOpacity>
      </View>)
    });
 
    return (
      <View style={{paddingTop: 10,paddingBottom: 30,}}>
        <Image
            resizeMode={'cover'}
            style={styles.HeaderImg}
            source={require('../../assets/smak.jpg')}
        />  
        <Text style={styles.question}>
          {this.state.question}
        </Text>
        <View style={{marginTop: 20,}}>
        { options }
        </View>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
 
  question: {
    fontFamily: 'PTSansBold',
    fontSize: 15,
    color: "#3E4A59",
    textAlign: "center",
    alignSelf: 'center',
    marginTop: 30,
  },
Optionbox:{
  marginTop: 5,
  marginBottom: 5,
  marginHorizontal: 20,
  borderBottomWidth: 0,
  backgroundColor: "white",
  borderRadius: 10,
  shadowColor: "#8386A3",
  shadowOffset: {
      width: 2,
      height: 4,
  },
  shadowOpacity: 0.15,
  shadowRadius: 3.84,
  elevation: 1,
  },
  HeaderImg:{
    width: '100%',
    height: 200,
    marginTop: 40,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#8386A3",
    shadowOffset: {
        width: 2,
        height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84
    }
});