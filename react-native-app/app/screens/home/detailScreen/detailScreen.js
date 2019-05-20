
import React, {Component} from 'react';
var { View, Text, AsyncStorage,Image,TouchableOpacity,FlatList,ScrollView } = require('react-native');
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';

import {Actions} from 'react-native-router-flux';
import { Icon } from 'react-native-elements'
import {setStatus, logout} from '../../../actions/auth'; //Import your actions
import {Button} from '../../index'; //Import your Button
import styles from './style' //Import your styles
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ListItem } from 'react-native-elements'

class groupScreen extends Component {

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
        <TouchableOpacity >
          <ListItem
            avatar={item.icon_url}
            avatarStyle={{backgroundColor:'white' }}
            title={item.info}
            titleStyle={color="#6FA29B"}
            titleNumberOfLines={2}
            containerStyle={styles.Liststyle}
            hideChevron
          />
        </TouchableOpacity>   
        )
      }

    render() {
        const list = [
            {
              info: 'Bekijk de route',
              icon_url: require('../../../../assets/001-destination.png'),
            },
            {
                info: '€5 voor volwassenen \n €2.5 per kind',
                icon_url: require('../../../../assets/002-money.png'),
            },
            {
                info: 'Tentoonstelling van 30 min',
                icon_url: require('../../../../assets/003-clock.png'),
            },
            {
                info: 'ma - vr 9u tot 19u \n zat - zon gesloten',
                icon_url: require('../../../../assets/004-calendar.png'),
            },
          ]
        return (
            <View style={styles.container}>
            <ScrollView>
                
                <Text style={styles.DetailTitle}>Detail Museum</Text>
                <Image
                    resizeMode={'cover'}
                    style={styles.HeaderImg}
                    source={require('../../../../assets/smak.jpg')}
                />   
                <View style={styles.CallToAction}>
                    <Animatable.View animation="pulse" iterationCount={1000000000} direction="alternate">    
                    <TouchableOpacity><Text onPress={() => Actions.kortingScreen()} style={{textAlign: "center",fontSize: 24,fontFamily: 'PTSansRegular',color: "white",}}>MUSEUM ONTDEKKEN</Text></TouchableOpacity> 
                    </Animatable.View> 
                </View>
                <Text style={styles.DetailText}>
                    Design Museum Gent is een museum in Gent met een omvangrijke collectie Belgisch en internationaal design. De verzameling omvat ontwerpen van de art nouveau van Henry Van de Velde tot de hedendaagse avantgarde- vormgeving.
                </Text>
                <FlatList
                    ref='infoRef'
                    data={list}
                    style={styles.Infobox}
                    renderItem={this.renderRow}
                    initialNumToRender={5}
                    keyExtractor={(item, index) => index.toString()}
                />
            </ScrollView>
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

export default connect(mapStateToProps, {setStatus, logout})(groupScreen);
