
 

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
import { ListItem,SearchBar } from 'react-native-elements'



import { fetchMuseumData } from '../../../actions/home';

class searchScreen extends Component {

    constructor (props) {
        super(props);
    
        this.state = {
          loading: false,
          error: null,
          value: ''
        };
      }

      searchFilterFunction = text => {
        this.setState({
          value: text
        });  
      };
      componentDidMount() {
        this.props.dispatch(fetchMuseumData());
      }
    

    renderRow ({ item }) {
        return (
        item.title === "Amy Farha" ? 
        <TouchableOpacity onPress={() => Actions.detailScreen(item)}>
          <ListItem
            roundAvatar
            title={item.title}
            subtitle={item.zipcode.city + ", " + item.zipcode.code + " " + item.zipcode.country}
            avatar={item.photo.url}
            containerStyle={styles.ListstyleSelected}
            subtitleStyle={styles.subtitleSelected}
            titleStyle={styles.ListItemTitleSelected}
            rightIcon={
                <Icon
                name='ios-arrow-forward'
                type='ionicon'
                color='white'
                size={15}
                iconStyle={{paddingRight: 15,}}
                onPress={() => console.log('hello')} />
            }
            chevronColor="#6FA29B"
          />
        </TouchableOpacity>  
        :
        <TouchableOpacity onPress={() => Actions.detailScreen(item)}>
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
        {item.check === true &&
          <Icon
                name='ios-checkmark'
                type='ionicon'
                color='#6FA29B'
                size={30}
                containerStyle={{position: 'absolute',top: '10%',left: '13%'}}/>
        }
        </TouchableOpacity> 

        )
      }

    render() {
        return (
            <View style={{flex: 1,backgroundColor: "#FFF",marginTop: 10,}}>
                        <View style={{marginLeft: 5,marginTop: 50,}}><NavBar/></View>
                        <View style={styles.SearchIconBox}>
                            <SearchBar
                            inputStyle={{backgroundColor: 'white',fontSize: 14,marginLeft: 20,}}
                            containerStyle={{backgroundColor: 'white',
                            borderBottomColor: 'transparent',
                            width: '90%',
                            borderTopColor: 'transparent', borderRadius: 10,
                            shadowColor: "#C7D0F8",
                            shadowOpacity: 0.5,
                            shadowRadius: 2,
                            shadowOffset: {
                              height: 3,
                              width: 0
                            }}}
                            placeholder="Zoeken..."
                            ref="search"
                            textInputRef="searchText"
                            value={this.state.value}
                            onChangeText={text => this.searchFilterFunction(text)}
                            searchIcon={{ size: 24 }}
                            />
                        </View>   
                        <Image
                            style={styles.SnakeLayout}
                            source={require('../../../../assets/logo.png')}
                        />
                     
                        <FlatList
                        ref='listRef'
                        data={this.props.museum.filter(item => item.title.includes(this.state.value))}
                        style={styles.Listbox}
                        renderItem={this.renderRow}
                        initialNumToRender={5}
                        keyExtractor={(item, index) => index.toString()}
                        />            
            </View>
        );
    }
};


const mapStateToProps = (state,props) => ({
    museum: state.homeReducer.museum,
  });
  
   export default connect(mapStateToProps)(searchScreen)

