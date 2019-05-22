
 

import React, {Component} from 'react';
var { View, Text, AsyncStorage,Image,TouchableOpacity,FlatList,ScrollView } = require('react-native');
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import { NavBar  } from '../../index';
import {Actions} from 'react-native-router-flux';
import { Icon,Avatar,ListItem } from 'react-native-elements'
import {setStatus, logout} from '../../../actions/auth'; //Import your actions
import {Button} from '../../index'; //Import your Button
import styles from './style' //Import your styles
import Ionicons from 'react-native-vector-icons/Ionicons'
class profileScreen extends Component {

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

    render() {
        const list = [
            {
              name: 'Amy Farha',
              avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              subtitle: 'Vice President'
            },
            {
              name: 'Chris Jackson',
              avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
              subtitle: 'Vice Chairman'
            },
          ]
        return (
            <ScrollView style={{flex: 1,backgroundColor: "#FFF",marginTop: 10,}}> 
             <View style={{marginLeft: 5,marginTop: 50,}}><NavBar/></View>
                <Avatar
                    containerStyle={{alignSelf: 'center',marginBottom: 20,}}
                    rounded
                    large
                    source={{
                        uri:
                        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    }}
                />
                <Text style={styles.profileName}>John Doe</Text>
                <TouchableOpacity onPress={() => Actions.detailScreen()}>
                    <ListItem
                        title={'Bewerken profiel'}
                        containerStyle={styles.Optionbox}
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
                <TouchableOpacity onPress={() => Actions.detailScreen()}>
                    <ListItem
                        title={'Badges & Beloningen'}
                        containerStyle={styles.Optionbox}
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
                <View style={{flex:1,paddingBottom: 30,}}>  
                    <Text style={styles.RecentMuseaTitle}>Recent bezochte musea</Text>
                        <FlatList
                            ref='listRef'
                            data={list}
                            style={styles.Listbox}
                            renderItem={this.renderRow}
                            initialNumToRender={5}
                            keyExtractor={(item, index) => index.toString()}
                        />
                </View> 
                {
                    // (this.props.loggedIn) &&
                <TouchableOpacity onPress={this.props.logout}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>
                                     UITLOGGEN
                                </Text>
                            </View>
                </TouchableOpacity>  
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

export default connect(mapStateToProps, {setStatus, logout})(profileScreen);
