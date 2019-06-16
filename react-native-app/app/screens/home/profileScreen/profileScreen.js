
 

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
import { fetchProfileData,fetchMuseumData } from '../../../actions/home';
class profileScreen extends Component {

    componentDidMount() {
        this.props.dispatch(fetchProfileData());
        this.props.dispatch(fetchMuseumData());
    }

    async logout() {
        try {
            await AsyncStorage.removeItem('token');
            const token = await AsyncStorage.getItem('token');
            if (!token){Actions.login();}
        }
        catch(exception) {
          return false;
        }
      }

    render() {
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
                    <ScrollView style={styles.Listbox}>
                    { this.props.museum.map((item, i) => (
                        <TouchableOpacity key={i} onPress={() => Actions.detailScreen(item)}>
                        <ListItem
                            roundAvatar
                            title={item.title}
                            subtitle={item.streetAndNumber + ", " + item.zipcode.code + " " + item.zipcode.city}
                            avatar={item.photo.url}
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
                    ))
                    }
                </ScrollView>
                </View> 
                {
                    // (this.props.loggedIn) &&
                <TouchableOpacity onPress={this.logout}>
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


const mapStateToProps = (state,props) => ({
    museum: state.homeReducer.museum.filter( addedItem => {
        return state.homeReducer.profile.museumsVisitedIds.find( cartItem => cartItem === addedItem.id );
    })
});
  
export default connect(mapStateToProps)(profileScreen);
