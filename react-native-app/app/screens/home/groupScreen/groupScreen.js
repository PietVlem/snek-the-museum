

import React, {Component} from 'react';
var { View, Text, AsyncStorage,Image,TouchableOpacity,FlatList,StyleSheet,ScrollView } = require('react-native');
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import { NavBar  } from '../../index';
import RNPickerSelect from 'react-native-picker-select';
import {Actions} from 'react-native-router-flux';
import { Icon } from 'react-native-elements'
import {setStatus, logout} from '../../../actions/auth'; //Import your actions

import { ListItem } from 'react-native-elements';
import {Button} from '../../index'; //Import your Button
import styles from './style' //Import your styles
import Ionicons from 'react-native-vector-icons/Ionicons'

import { fetchCategoriesData,fetchDisabilitiesData } from '../../../actions/home';

class groupScreen extends Component {

    constructor(props) {
        super(props);
        this.inputRefs = {};
        this.state = {
            type: "",
            disabilities: "",
            visited: ""
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(fetchCategoriesData());
        this.props.dispatch(fetchDisabilitiesData());
    }
    renderRow ({ item }) {
        return (
        <TouchableOpacity onPress={() => Actions.detailScreen()}>
          <ListItem
            roundAvatar
            title={item.name}
            subtitle={item.subtitle}
            avatar={{uri:item.avatar_url}}
            containerStyle={styles.Liststyle}
            subtitleStyle={styles.subtitle}
            titleStyle={styles.ListItemTitle}
            rightIcon={
                <Icon
                name='ios-arrow-forward'
                type='ionicon'
                color='#6FA29B'
                size={15}
                iconStyle={{paddingRight: 15,}}
                onPress={() => console.log('hello')} />
            }
            chevronColor="#6FA29B"
          />
        </TouchableOpacity>   
        )
      }

    onChange(e, fieldName) {
        const {text} = e.nativeEvent
        this.setState({ [fieldName] : text });
    }

    async filter(){
        await AsyncStorage.multiSet([
            ["type", this.state.type],
            ["disabilities", this.state.disabilities],
            ["visited", this.state.visited],    
        ])
        Actions.spinPage();
    }

    renderRow ({ item }) {
        return (
          <ListItem
            roundAvatar
            title={item.name}
            containerStyle={styles.Liststyle}
            titleStyle={styles.ListItemTitle}
            rightIcon={
                <Icon
                name='ios-close'
                type='ionicon'
                color='#6FA29B'
                size={25}
                iconStyle={{paddingRight: 15,}}
                onPress={() => console.log('hello')} />
            }
          />  
        )
      }

    render() {
        const typeMuseum = this.props.categories;
        const typeDisabilities = this.props.disabilities;
        return (
            <ScrollView style={{flex: 1,backgroundColor: "#FFF",marginTop: 50,}}>
                <View style={{marginLeft: 5,}}><NavBar/></View>
                <Image
                            style={styles.SnakeLayout}
                            source={require('../../../../assets/logo.png')}
                        />
                <View style={{marginBottom: 40,}}>
                    <Text style={styles.FilterTitle}>Voorkeuren</Text> 
                    <Text style={styles.labelSelect}>Type</Text>
                    <RNPickerSelect
                        placeholder={{
                            label: 'Type',
                            value: null,
                        }}
                        items={
                            typeMuseum.map((data) => {
                            return ({
                            label: data.name,
                            value: data.name,
                            })
                        })}
                        onValueChange={(value) => {
                            this.setState({
                                type: value,
                            });
                        }}
                        style={{ ...pickerSelectStyles}}
                        value={this.state.type}
                        ref={(el) => {
                            this.inputRefs.picker = el;
                        }}
                    />
                    <Text style={styles.labelSelect}>Toegankelijkheid</Text>
                    <RNPickerSelect
                        placeholder={{
                            label: 'Toegankelijkheid',
                            value: null,
                        }}
                        items={
                            typeDisabilities.map((data) => {
                            return ({
                            label: data.name,
                            value: data.name,
                            })
                        })}
                        onValueChange={(value) => {
                            this.setState({
                                disabilities: value,
                            });
                        }}
                        style={{ ...pickerSelectStyles}}
                        value={this.state.disabilities}
                        ref={(el) => {
                            this.inputRefs.picker = el;
                        }}
                    />
                    <Text style={styles.labelSelect}>Museum</Text>
                    <RNPickerSelect
                        placeholder={{
                            label: 'Bezocht',
                            value: null,
                        }}
                        items={[
                            {
                                label: 'Eerder bezocht',
                                value: 'design',
                            },
                            {
                                label: 'Niet eerder bezocht',
                                value: 'child',
                            },
                        ]}
                        onValueChange={(value) => {
                            this.setState({
                                visited: value,
                            });
                        }}
                        style={{ ...pickerSelectStyles}}
                        value={this.state.visited}
                        ref={(el) => {
                            this.inputRefs.picker = el;
                        }}
                    />
                </View>
                <TouchableOpacity onPress={() => this.filter()} style={styles.btnContainer}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            VOORKEUREN BEVESTIGEN
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        );
    }
};


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        width: "90%",
        marginVertical: 10,
        borderBottomColor: 'white',
        backgroundColor: "white", 
        shadowOffset:{  width: 4,  height: 6,  },
        shadowColor: '#8386A3',
        shadowOpacity: 0.12,
        borderRadius: 10,
        paddingTop: 20,
        paddingBottom: 20,
        marginHorizontal: 20,
        paddingLeft: 30,
        fontSize: 14,
        fontFamily:"MontserratMedium",
        color: "#303E48",
    },
});


function mapStateToProps(state, props) {
    return {
        categories: state.homeReducer.categories,
        disabilities: state.homeReducer.disabilities
    }
}

export default connect(mapStateToProps)(groupScreen);
