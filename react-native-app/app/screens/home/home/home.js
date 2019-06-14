
 

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

import { fetchProfileData,fetchMuseumData } from '../../../actions/home';
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
          dataSource: [],
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchProfileData());
        this.props.dispatch(fetchMuseumData());
    }
    

    
    renderRow ({ item }) {
        return (
        <TouchableOpacity onPress={() => Actions.detailScreen()}>
          <ListItem
            roundAvatar
            title={item.title}
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
        return (
            <View style={{flex: 1,backgroundColor: "#FFF",marginTop: 80,}}>
                
                    <Text style={styles.Pushtitle}>Duw hier voor een nieuw museum avontuur !</Text>
                        <View style={styles.SearchIconBox}>
                            <Ionicons name={ "ios-arrow-round-down"}
                                size={45} style={{marginBottom: 20,}} color={"#6FA29B"}/>
                            <Animatable.View animation="pulse" iterationCount={1000000000} direction="alternate">    
                                <TouchableOpacity onPress={() => Actions.groupScreen()} style={styles.SearchBtn}>
                                    <Image
                                        style={styles.SearchIcon}
                                        source={require('../../../../assets/binoculars.png')}
                                    /> 
                                </TouchableOpacity> 
                            </Animatable.View> 
                        </View>   
                        <Image
                            style={styles.SnakeLayout}
                            source={require('../../../../assets/logo.png')}
                        />
                        <Text style={styles.RecentMuseaTitle}>Recent bezochte musea</Text>
                        <ScrollView style={styles.Listbox}>
                            { this.props.museum.map((item, i) => (
                                <TouchableOpacity key={i} onPress={() => Actions.detailScreen()}>
                                <ListItem
                                    roundAvatar
                                    title={item.title}
                                    subtitle={item.zipcode.city + ", " + item.zipcode.code + " " + item.zipcode.country}
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
        );
    }
};


const mapStateToProps = (state,props) => ({
    VisitedMuseumId: state.homeReducer.profile,
    museum: state.homeReducer.museum.filter( addedItem => {
        return state.homeReducer.profile.museumsVisitedIds.find( cartItem => cartItem === addedItem.id );
    })
  });
  
   export default connect(mapStateToProps)(Home)
