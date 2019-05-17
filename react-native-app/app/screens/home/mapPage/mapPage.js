import React, {Component} from 'react';
var { View, Text, AsyncStorage,Image,TouchableOpacity,FlatList } = require('react-native');
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import { NavBar  } from '../../index';
import {Actions} from 'react-native-router-flux';
import { Icon } from 'react-native-elements'
import {setStatus, logout} from '../../../actions/auth'; //Import your actions
import {Button} from '../../index'; //Import your Button
import styles from './style' //Import your styles
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ListItem } from 'react-native-elements'
import { MapView } from 'expo';
class mapPage extends Component {

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
        <TouchableOpacity style={styles.Liststyle}>
          <ListItem
            roundAvatar
            title={item.name}
            subtitle={item.subtitle}
            avatar={{uri:item.avatar_url}}
            containerStyle={{borderBottomWidth: 0,borderRadius: 10,}}
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
          <View style={styles.MapMuseaBox}>
            <View style={{flex: 1,flexDirection: 'row',}}>
                <Image
                    style={styles.distanceIcon}
                    source={require('../../../../assets/mountain.png')}
                />
                <Text style={styles.distanceText}>Fiets: 20min </Text>
            </View>
            <View style={{flex: 1,flexDirection: 'row',}}>
                <Image
                    style={styles.distanceIcon}
                    source={require('../../../../assets/bus.png')}
                />
                <Text style={styles.distanceText}>Bus: Lijn 55 - 12:30u</Text>
            </View>
          </View>  
        </TouchableOpacity>   
        )
      }

    static navigationOptions = {
        header: null,
    };  

    render() {
        const list = [
            {
              name: 'Amy Farha',
              avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              subtitle: 'Vice President'
            },
          ]
        return (
            <View style={{flex: 1,backgroundColor: "#FFF"}}>
                    
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
            />
            <FlatList
            ref='listRef'
            data={list}
            style={styles.Listbox}
            renderItem={this.renderRow}
            initialNumToRender={5}
            keyExtractor={(item, index) => index.toString()}/>            
            </View>
        );
    }
};


function mapStateToProps(state, props) {
    return {
        loggedIn: state.authReducer.loggedIn
    }
}

export default connect(mapStateToProps, {setStatus, logout})(mapPage);
