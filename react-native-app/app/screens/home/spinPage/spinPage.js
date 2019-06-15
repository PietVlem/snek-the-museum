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
import { fetchMuseumData } from '../../../actions/home';

class spinPage extends Component {

    constructor (props) {
        super(props);
    
        this.state = {
          PickedMuseum: ''
        };
      }

    renderRow ({ item }) {
        return (
        ( item.category.name === 'Kunst' && 
        <TouchableOpacity>
          <ListItem
            roundAvatar
            title={item.title}
            subtitle={item.zipcode.city + ", " + item.zipcode.code + " " + item.zipcode.country}
            avatar={item.photo.url}
            containerStyle={styles.Liststyle}
            subtitleStyle={styles.subtitle}
            titleStyle={styles.ListItemTitle}
            onPress={() => Actions.detailScreen(item)} 
            rightIcon={
                <Icon
                name='ios-arrow-forward'
                type='ionicon'
                color='#6FA29B'
                size={15}
                iconStyle={{paddingRight: 15,}}/>
            }
            chevronColor="#6FA29B"
          />
        </TouchableOpacity>   
        )
        )
      }

    pickMuseum (quotes){
        const pickedMuseum = quotes[Math.floor(Math.random() * quotes.length)];
        this.setState({ PickedMuseum: pickedMuseum})
    } 
      

    render() {
        const quotes = this.props.museum
        return (
            <View style={{flex: 1,backgroundColor: "#FFF"}}>
            <View style={{marginLeft: 5,marginTop: 40,}}><NavBar /></View>
            <Text style={styles.PushTitle}>Het grote moment</Text> 
            <Text style={styles.Subtitle}>Kom hier je volgende Museum avontuur te weten!</Text>
                        <View style={styles.SearchIconBox}>
                            <Animatable.View animation="pulse" iterationCount={1000000000}  direction="alternate">    
                                <TouchableOpacity onPress={() => this.pickMuseum(quotes)} style={styles.SearchBtn}>
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
                    <Text style={styles.PushTitle}>Je resultaat: </Text> 
                        <FlatList
                        ref='listRef'
                        data={this.props.museum.filter(item => item.id === this.state.PickedMuseum.id)}
                        style={styles.Listbox}
                        renderItem={this.renderRow}
                        initialNumToRender={1}
                        keyExtractor={(item, index) => index.toString()}/>            
            </View>
        );
    }
};


const mapStateToProps = (state,props) => ({
    museum: state.homeReducer.museum
});

export default connect(mapStateToProps)(spinPage);
