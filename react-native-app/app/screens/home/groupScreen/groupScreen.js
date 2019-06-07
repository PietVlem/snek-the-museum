

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

class groupScreen extends Component {
    state = {
        search: '',
      };
    
    updateSearch = search => {
        this.setState({ search });
    };
    constructor(props) {
        super(props);
        this.inputRefs = {};
        this.state = {
            type: "",
            price: "",
            visited: ""
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        var _this = this;

        // //Check if token exist
        // AsyncStorage.getItem('token', (err, token) => {
        //     if (token === null) Actions.welcome();
        //     else _this.props.setStatus(true)
        // });
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
        const { search } = this.state;
        const list = [
            {
              name: 'Design Museum',
              avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              subtitle: 'Jan Brydelstraat 5, 9000 Gent'
            },
            {
              name: 'Smak',
              avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
              subtitle: 'Jan Hoetplein 1, 9000 Gent'
            },
          ]
        const listPersons = [
            {
              name: 'Amy Farha',
            },
            {
              name: 'Chris Jackson',
            },
            {
                name: 'Chris Jackson',
            },
            {
                name: 'Chris Jackson',
            },
          ]  
        return (
            <ScrollView style={{flex: 1,backgroundColor: "#FFF",marginTop: 50,}}>
                <View>
                <View style={{marginLeft: 5,}}><NavBar/></View>
                    <Text style={styles.GroupCreateTitle}>Snake groep maken</Text> 
                        <FlatList
                        ref='listRef'
                        data={listPersons}
                        style={styles.Listbox}
                        renderItem={this.renderRow}
                        initialNumToRender={5}
                        keyExtractor={(item, index) => index.toString()}/>            
                </View>
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
                        items={[
                            {
                                label: 'Design gericht',
                                value: 'design',
                            },
                            {
                                label: 'Kindvriendelijk',
                                value: 'child',
                            },
                            {
                                label: 'Nieuw',
                                value: 'new',
                            },
                            {
                                label: 'Historiek',
                                value: 'history',
                            },
                        ]}
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
                    <Text style={styles.labelSelect}>Prijs</Text>
                    <RNPickerSelect
                        placeholder={{
                            label: 'Prijs',
                            value: null,
                        }}
                        items={[
                            {
                                label: 'minder dan 10 €',
                                value: 'min',
                            },
                            {
                                label: 'meer dan 10 €',
                                value: 'more',
                            },
                        ]}
                        onValueChange={(value) => {
                            this.setState({
                                price: value,
                            });
                        }}
                        style={{ ...pickerSelectStyles}}
                        value={this.state.price}
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
                <TouchableOpacity onPress={() => Actions.spinPage()} style={styles.btnContainer}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            GROEP BEVESTIGEN
                        </Text>
                    </View>
                </TouchableOpacity>
                    
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
        //loggedIn: state.authReducer.loggedIn
    }
}

export default connect(mapStateToProps, {setStatus, logout})(groupScreen);
